# Lista de Lectura con IA

Una aplicación moderna de lista de lectura desarrollada con Next.js 15 que permite a los usuarios guardar y gestionar artículos, con funcionalidad de chat con IA integrada para analizar y discutir contenido.

## Características

- **Gestión de Artículos**: Guarda, visualiza y elimina artículos con título, URL y descripción
- **Chat con IA**: Interactúa con un asistente de IA powered by Google Gemini 2.5 Pro
- **Web Scraping**: Extrae automáticamente contenido de URLs usando Playwright
- **Interfaz Moderna**: UI construida con Shadcn/ui y Tailwind CSS
- **Base de Datos Distribuida**: Utiliza Turso (SQLite distribuida) para almacenamiento
- **Server Actions**: Aprovecha las últimas características de Next.js 15 y React 19

## Tecnologías Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Runtime**: React 19
- **Base de Datos**: Turso (SQLite distribuida)
- **IA**: Vercel AI SDK + Google Gemini 2.5 Pro
- **UI**: Shadcn/ui + Tailwind CSS v4
- **Validación**: Zod
- **Web Scraping**: Playwright
- **Gestor de Paquetes**: Bun (también compatible con npm)

## Requisitos Previos

- Node.js 18 o superior
- Bun (recomendado) o npm
- Una base de datos. Recomiendo [Turso](https://turso.tech/) para la base de datos
- API key de la empresa de AI. Se esta utilizando google por ejemplo [Google AI Studio](https://makersuite.google.com/app/apikey) para Gemini

## Instalación

1. **Clona el repositorio**

```bash
git clone <url-del-repositorio>
cd reading-list-app
```

2. **Instala las dependencias**

```bash
bun install
# o
npm install
```

3. **Instala los navegadores de Playwright**

```bash
npx playwright install
```
## Uso

### Modo Desarrollo

```bash
bun run dev
# o
npm run dev
```
### Build de Producción

```bash
bun run build
bun run start
# o
npm run build
npm run start
```

### Linting

```bash
bun run lint
# o
npm run lint
```

## Estructura del Proyecto

```
reading-list-app/
├── app/
│   ├── actions.ts              # Server Actions para formularios
│   ├── page.tsx                # Página principal (lista de lectura)
│   ├── chat/
│   │   └── page.tsx            # Página de chat con IA
│   └── api/
│       ├── article/
│       │   └── route.ts        # Endpoints CRUD de artículos
│       └── chat/
│           └── route.ts        # Endpoint de streaming de chat IA
├── components/
│   ├── article-form.tsx        # Formulario para agregar artículos
│   └── ui/                     # Componentes Shadcn/ui
├── db/
│   └── clientTurso.ts          # Cliente de base de datos Turso
└── lib/
    └── utils.ts                # Utilidades y helpers
```

## Características de IA

El chat de IA incluye herramientas (tools) que permiten al modelo:

- Navegar y extraer contenido de URLs
- Procesar y analizar páginas web
- Responder preguntas sobre el contenido extraído

Las herramientas se pueden extender en `app/api/chat/route.ts`.

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Soporte

Si encuentras algún problema o tienes preguntas, por favor abre un issue en el repositorio.
