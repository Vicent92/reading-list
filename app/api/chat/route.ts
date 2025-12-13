import { google } from "@ai-sdk/google";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";
import z from "zod";
import { turso } from "@/db/clientTurso";
import { chromium } from "playwright";
// import { createClient } from "@/lib/supabase/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  // Validar que el usuario esté autenticado
  // const supabase = await createClient()
  // const { data: { user }, error } = await supabase.auth.getUser()

  // if (error || !user) {
  //   return new Response(JSON.stringify({
  //     message: 'No autorizado'
  //   }), {
  //     status: 401,
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  // }

  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      searchArticleByTitle: tool({
        description:
          "Buscar artículos en la lista de lectura por título. Permite búsqueda parcial (case-insensitive).",
        inputSchema: z.object({
          title: z
            .string()
            .describe("El título o parte del título del artículo a buscar"),
        }),
        execute: async ({ title }) => {
          try {
            const result = await turso.execute({
              sql: "SELECT id, title, url, description, dateAdded FROM articles WHERE LOWER(title) LIKE LOWER(?)",
              args: [`%${title}%`],
            });

            if (result.rows.length === 0) {
              return {
                found: false,
                message: `No se encontraron artículos con el título "${title}"`,
                articles: [],
              };
            }

            return {
              found: true,
              message: `Se encontraron ${result.rows.length} artículo(s)`,
              articles: result.rows.map((row) => ({
                id: row.id,
                title: row.title,
                url: row.url,
                description: row.description,
                dateAdded: row.dateAdded,
              })),
            };
          } catch (error) {
            console.error("Error al buscar artículo:", error);
            return {
              found: false,
              message: "Error al buscar en la base de datos",
              articles: [],
              error: String(error),
            };
          }
        },
      }),
      summarizeArticleFromUrl: tool({
        description: `Navegar a un enlace (URL) de un artículo y extraer su contenido para hacer un resumen según las indicaciones del usuario.
          Usa Playwright para navegar y extraer contenido de páginas web modernas.

          IMPORTANTE: Al finalizar el resumen, SIEMPRE pregunta al usuario:
          "¿Quieres que te genere sugerencias prácticas de cómo aplicar esta información?"

          Si el usuario responde afirmativamente, usa la tool 'suggestPracticalApplications' automáticamente.`,
        inputSchema: z.object({
          url: z.string().url().describe("La URL del artículo a resumir"),
        }),
        execute: async ({ url }) => {
          let browser;
          try {
            // Lanzar navegador headless
            browser = await chromium.launch({
              headless: true,
            });

            const context = await browser.newContext({
              userAgent:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            });

            const page = await context.newPage();

            // Navegar a la URL con timeout
            await page.goto(url, {
              waitUntil: "domcontentloaded",
              timeout: 30000,
            });

            // Esperar un poco para que el contenido dinámico se cargue
            await page.waitForTimeout(2000);

            // Extraer el título
            const title = await page.title();

            // Extraer metadatos
            const metaDescription = await page
              .$eval('meta[name="description"]', (el) =>
                el.getAttribute("content"),
              )
              .catch(() => null);
            const metaAuthor = await page
              .$eval('meta[name="author"]', (el) => el.getAttribute("content"))
              .catch(() => null);

            // Extraer el contenido principal del artículo
            // Intentar encontrar el contenido principal usando selectores comunes
            const contentSelectors = [
              "article",
              '[role="main"]',
              "main",
              ".article-content",
              ".post-content",
              ".entry-content",
              ".content",
              "body",
            ];

            let content = "";
            for (const selector of contentSelectors) {
              try {
                const element = await page.$(selector);
                if (element) {
                  content = await element.innerText();
                  if (content && content.length > 200) {
                    break; // Si encontramos contenido significativo, salimos
                  }
                }
              } catch (e) {
                continue;
              }
            }

            // Si no encontramos contenido, usar el body completo
            if (!content || content.length < 200) {
              content = await page.innerText("body");
            }

            await browser.close();

            if (!content || content.trim().length === 0) {
              return {
                success: false,
                message: "No se pudo extraer el contenido del artículo",
                content: null,
              };
            }

            return {
              success: true,
              message: "Contenido extraído exitosamente usando Playwright",
              title: title || "Sin título",
              author: metaAuthor || "Autor desconocido",
              content: content.trim(),
              description: metaDescription || "",
              url: url,
              siteName: new URL(url).hostname,
            };
          } catch (error) {
            console.error(
              "Error al procesar el artículo con Playwright:",
              error,
            );
            if (browser) {
              await browser.close().catch(() => {});
            }
            return {
              success: false,
              message: `Error al procesar el artículo: ${error instanceof Error ? error.message : String(error)}`,
              content: null,
              error: String(error),
            };
          }
        },
      }),
      suggestPracticalApplications: tool({
        description: `Genera sugerencias prácticas y accionables sobre cómo el usuario puede aplicar la información de un artículo.

          Esta tool debe ser usada cuando el usuario quiera saber cómo aplicar o usar prácticamente la información de un artículo.

          Cuando esta tool se ejecute, debes generar una lista estructurada con las siguientes categorías:

          1. **Acciones Inmediatas**: Pasos concretos que el usuario puede tomar hoy mismo
          2. **Aplicaciones a Largo Plazo**: Cómo integrar estos conceptos en proyectos o hábitos futuros
          3. **Herramientas y Recursos**: Tecnologías, librerías o recursos mencionados que el usuario puede explorar
          4. **Conceptos Clave para Recordar**: Ideas principales que vale la pena retener
          5. **Próximos Pasos de Aprendizaje**: Qué más aprender relacionado con este tema

          Presenta las sugerencias de forma clara, práctica y accionable.`,
        inputSchema: z.object({
          articleUrl: z
            .string()
            .url()
            .describe("La URL del artículo para el cual generar sugerencias"),
          summary: z
            .string()
            .optional()
            .describe(
              "Resumen del artículo (opcional, si ya está disponible en el contexto)",
            ),
        }),
        execute: async ({ articleUrl, summary }) => {
          try {
            // Esta tool no necesita hacer scraping de nuevo,
            // simplemente retorna metadata que la IA usará para generar sugerencias
            return {
              success: true,
              action: "generate_practical_applications",
              articleUrl,
              hasSummary: !!summary,
              message:
                "Genera sugerencias prácticas basadas en el contenido del artículo",
              categories: [
                "Acciones Inmediatas",
                "Aplicaciones a Largo Plazo",
                "Herramientas y Recursos",
                "Conceptos Clave para Recordar",
                "Próximos Pasos de Aprendizaje",
              ],
            };
          } catch (error) {
            console.error("Error al preparar sugerencias:", error);
            return {
              success: false,
              message: "Error al preparar las sugerencias de aplicación",
              error: String(error),
            };
          }
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
