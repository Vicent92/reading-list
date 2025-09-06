# GEMINI.md

## Project Overview

This is a Next.js application for managing a reading list. It allows users to save articles to a database and view them in a list. The project uses a combination of modern web technologies:

*   **Framework:** [Next.js](https://nextjs.org/) (a React framework for building server-rendered applications)
*   **Database:** [Turso](https://turso.tech/) (a distributed SQLite database)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (a collection of accessible and customizable UI components)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (a utility-first CSS framework)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)

The application is structured as a standard Next.js project with an `app` directory for the main application logic, a `components` directory for the UI components, a `db` directory for the database client, and a `public` directory for static assets.

## Building and Running

To build and run this project, you will need to have [Node.js](https://nodejs.org/) and [Bun](https://bun.sh/) installed.

1.  **Install dependencies:**

    ```bash
    bun install
    ```

2.  **Run the development server:**

    ```bash
    bun run dev
    ```

    This will start the development server at `http://localhost:3000`.

3.  **Build for production:**

    ```bash
    bun run build
    ```

    This will create an optimized production build of the application.

4.  **Run in production:**

    ```bash
    bun run start
    ```

    This will start the production server.

## Development Conventions

*   **Coding Style:** The project uses the standard TypeScript and React coding styles, with the addition of ESLint for code linting.
*   **Testing:** There are no testing practices evident in the codebase.
*   **Contribution Guidelines:** There are no contribution guidelines evident in the codebase.
