# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) cuando trabaja con código en este repositorio.

## Descripción del Proyecto

Esta es una aplicación de lista de lectura desarrollada en Next.js 15 que permite a los usuarios guardar y gestionar artículos. La aplicación utiliza patrones modernos de React incluyendo Server Actions, el hook useActionState de React 19, y renderizado del lado del servidor.

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
- **Rutas API:** Endpoints REST en `app/api/article/route.ts` para obtención de datos
- **Componentes UI:** Componentes Shadcn/ui con estilos Tailwind CSS

### Archivos Clave
- `app/page.tsx` - Página principal de lista de lectura (componente servidor)
- `app/actions.ts` - Server Actions para manejo de formularios y mutaciones de datos
- `app/api/article/route.ts` - Endpoints API para operaciones CRUD de artículos
- `components/article-form.tsx` - Componente cliente para agregar artículos
- `db/clientTurso.ts` - Configuración del cliente de base de datos

### Patrón de Manejo de Formularios
La aplicación utiliza el hook useActionState de React 19 con Server Actions:
1. Componente de formulario cliente llama a Server Action
2. Server Action valida con esquema Zod
3. Operaciones de base de datos realizadas via cliente Turso
4. Revalidación de ruta activa actualización de datos
5. Estado del formulario se actualiza con mensajes de éxito/error

### Framework UI
- **Componentes:** Shadcn/ui con primitivos Radix UI
- **Estilos:** Tailwind CSS con variables CSS personalizadas para temas
- **Iconos:** Lucide React
- **Fuentes:** Geist Sans y Mono
- **Analytics:** Integración con Vercel Analytics

## Notas de Configuración

- Errores de TypeScript y ESLint son ignorados durante builds (ver next.config.mjs)
- Alias de ruta `@/*` mapea a la raíz del proyecto
- Imágenes están sin optimizar en configuración
- Idioma español utilizado en texto de la interfaz

## Guías de Desarrollo

Al trabajar con este código base:
1. Seguir el patrón existente de Server Action para envíos de formularios
2. Usar componentes Shadcn/ui para consistencia
3. Mantener idioma español en texto visible al usuario
4. Agregar validación Zod apropiada para nuevos formularios
5. Usar el patrón establecido de cliente de base de datos via Turso
6. Seguir la estructura de directorio app para nuevas páginas/rutas