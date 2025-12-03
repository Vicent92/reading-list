# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) cuando trabaja con código en este repositorio.

## Descripción del Proyecto

Esta es una aplicación de lista de lectura desarrollada en Next.js 15 que permite a los usuarios guardar y gestionar artículos. La aplicación utiliza patrones modernos de React incluyendo Server Actions, el hook useActionState de React 19, y renderizado del lado del servidor. Incluye una funcionalidad de chat con IA integrada utilizando Vercel AI SDK y Google Gemini.

## Comandos de Desarrollo

**Servidor de desarrollo:**
```bash
npm run dev
# o
bun run dev
```

**Construir para producción:**
```bash
npm run build
# o
bun run build
```

**Iniciar servidor de producción:**
```bash
npm run start
# o
bun run start
```

**Linting:**
```bash
npm run lint
# o
bun run lint
```

Nota: El proyecto utiliza Bun como gestor de paquetes preferido (bun.lock presente), pero los comandos npm también funcionan.

## Arquitectura

### Capa de Base de Datos
- **Base de datos:** Turso (SQLite distribuida) accedida via `@libsql/client`
- **Cliente:** Ubicado en `db/clientTurso.ts`
- **Esquema:** Tabla articles con columnas: id, title, url, description, dateAdded
- **Variables de entorno requeridas:** `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `DOMAIN_URL`

### Estructura de la Aplicación
- **App Router:** Utiliza la estructura de directorio app de Next.js 15
- **Server Actions:** Envíos de formularios manejados via Server Actions en `app/actions.ts`
- **Rutas API:**
  - `app/api/article/route.ts` - Endpoints REST para operaciones CRUD de artículos (GET, POST, DELETE)
  - `app/api/chat/route.ts` - Endpoint de streaming para chat con IA usando Vercel AI SDK
- **Páginas:**
  - `app/page.tsx` - Página principal con lista de lectura
  - `app/chat/page.tsx` - Página de chat con IA
- **Componentes UI:** Componentes Shadcn/ui con estilos Tailwind CSS

### Archivos Clave
- `app/page.tsx` - Página principal de lista de lectura (componente servidor)
- `app/chat/page.tsx` - Página de chat con IA (componente cliente)
- `app/actions.ts` - Server Actions para manejo de formularios y mutaciones de datos
- `app/api/article/route.ts` - Endpoints API para operaciones CRUD de artículos
- `app/api/chat/route.ts` - Endpoint de streaming de chat con IA
- `components/article-form.tsx` - Componente cliente para agregar artículos
- `db/clientTurso.ts` - Configuración del cliente de base de datos

### Patrón de Manejo de Formularios
La aplicación utiliza el hook useActionState de React 19 con Server Actions:
1. Componente de formulario cliente llama a Server Action
2. Server Action valida con esquema Zod
3. Server Action hace petición fetch al endpoint API correspondiente
4. Operaciones de base de datos realizadas en el endpoint API via cliente Turso
5. Revalidación de ruta activa actualización de datos mediante `revalidatePath('/')`
6. Estado del formulario se actualiza con mensajes de éxito/error

### Integración de IA
La aplicación incluye un chat con IA implementado con:
- **SDK:** Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/google`)
- **Modelo:** Google Gemini 2.5 Pro
- **Hook:** `useChat` de `@ai-sdk/react` para manejo de mensajes en el cliente
- **Streaming:** Respuestas en tiempo real mediante `streamText` y `toUIMessageStreamResponse()`
- **Tools:** Sistema de herramientas con ejemplos de clima y conversión de temperatura
- **Configuración:** `maxDuration: 30` segundos, `stopWhen: stepCountIs(5)` para limitar pasos

El patrón de implementación de chat:
1. Componente cliente usa hook `useChat` para gestionar estado de mensajes
2. Envío de mensajes mediante `sendMessage({ text: input })`
3. Endpoint API recibe mensajes y los convierte con `convertToModelMessages`
4. Modelo Gemini procesa con capacidad de usar tools definidas
5. Respuesta se transmite en tiempo real al cliente mediante streaming

### Framework UI
- **Componentes:** Shadcn/ui con primitivos Radix UI (completo set de componentes incluyendo Card, Button, Input, Textarea, Label, Badge, Dialog, etc.)
- **Estilos:** Tailwind CSS v4 con variables CSS personalizadas para temas
- **Iconos:** Lucide React
- **Fuentes:** Geist Sans y Mono
- **Analytics:** Integración con Vercel Analytics
- **Temas:** Sistema de temas con `next-themes`

## Notas de Configuración

- Errores de TypeScript y ESLint son ignorados durante builds (ver next.config.mjs)
- Alias de ruta `@/*` mapea a la raíz del proyecto
- Imágenes están sin optimizar en configuración
- Idioma español utilizado en texto de la interfaz

## Dependencias Principales

### Core
- **Next.js:** v15.2.4 (App Router, Server Actions, Route Handlers)
- **React:** v19 (con hooks modernos como useActionState)
- **TypeScript:** v5

### Base de Datos
- **@libsql/client:** v0.15.14 (cliente Turso)

### IA y Streaming
- **ai:** v5.0.68 (Vercel AI SDK Core)
- **@ai-sdk/react:** v2.0.68 (hooks de React para IA)
- **@ai-sdk/google:** v2.0.23 (integración con Google Gemini)
- **@ai-sdk/openai:** v2.0.50 (integración con OpenAI disponible)

### Formularios y Validación
- **@hookform/resolvers:** v3.10.0
- **zod:** v4.1.12

### UI Framework
- **@radix-ui/*:** Primitivos para componentes UI (Dialog, Dropdown, Tabs, etc.)
- **tailwindcss:** v4.1.9
- **lucide-react:** v0.454.0 (iconos)
- **sonner:** v1.7.4 (notificaciones toast)
- **next-themes:** v0.4.6 (manejo de temas)
- **class-variance-authority:** v0.7.1 (variantes de componentes)
- **tailwind-merge:** v2.5.5 (merge de clases Tailwind)

## Guías de Desarrollo

Al trabajar con este código base:
1. **Formularios:** Seguir el patrón Server Action + useActionState para formularios
2. **API:** Las Server Actions deben llamar a endpoints API (no acceder directamente a la base de datos)
3. **Componentes UI:** Usar componentes Shadcn/ui para consistencia visual
4. **Idioma:** Mantener español en todo el texto visible al usuario
5. **Validación:** Agregar validación Zod apropiada para nuevos formularios
6. **Base de datos:** Operaciones de BD solo en Route Handlers (`app/api/*/route.ts`)
7. **Estructura:** Seguir la estructura de directorio app para nuevas páginas/rutas
8. **Chat IA:** Para extender funcionalidad de IA, agregar tools en `app/api/chat/route.ts` usando el patrón de Vercel AI SDK
9. **Navegación:** Mantener enlaces entre páginas (ej: botón "IA Chat" en página principal, "Volver" en chat)
