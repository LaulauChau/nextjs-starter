# NextJS Clean Architecture Template

This is a NextJS template that incorporates modern web development practices and tools, following clean architecture principles.

## Features

- **NextJS with App Directory**: Utilizing the latest NextJS features for improved routing and layouts.
- **Drizzle ORM**: TypeScript ORM for SQL databases.
- **PostgreSQL**: Robust, open-source relational database.
- **Biome**: Fast linter and formatter for JavaScript, TypeScript, and more.
- **Commitlint**: Lint commit messages.
- **Lint-staged**: Run linters on git staged files.
- **Husky**: Git hooks made easy.
- **Vitest**: Next-generation testing framework.
- **TailwindCSS**: Utility-first CSS framework.
- **Clean Architecture**: Separation of concerns for maintainable and scalable code.
- **Shadcn UI**: A collection of re-usable components built with Radix UI and Tailwind CSS.

## Prerequisites

- Node.js (>=20.16.0)
- PostgreSQL (>=9.6.0) (we provide a Docker Compose file for development if needed)

## Getting Started

1. Install the dependencies:

```bash
pnpm install --frozen-lockfile
```

2. Create a `.env` file and update the environment variables if needed:

```bash
cp .env.example .env
```

3. Run the database migrations:

```bash
pnpm db:migrate
```

4. Start the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Commands

- `pnpm build`: Build the application for production.
- `pnpm commit`: Commit changes using Commitizen.
- `pnpm db:generate`: Generate a new migration.
- `pnpm db:migrate`: Run pending migrations.
- `pnpm dev`: Start the development server.
- `pnpm lint`: Format and lint the codebase.
- `pnpm start`: Start the production server.
- `pnpm test`: Run the test suite.

## Project Structure

```
src
├── app # Presentation layer
│   ├── actions # Next.js server actions
│   ├── components # Reusable components
│   │   ├── providers
│   │   └── ui # Shadcn UI components
│   ├── hooks # Custom hooks
│   ├── libs # Utility functions (only front-end related)
│   ├── (routes) # Next.js pages
│   │   ├── (protected)
│   │   ├── (public)
│   ├── styles # Global styles
│   └── validations # Zod validation schemas
├── core # Business layer
│   ├── di # Dependency injection
│   ├── interfaces # Service interfaces
│   └── use-cases # Application use cases
├── domain # Domain layer
│   ├── entities # Domain entities
│   └── interfaces # Domain interfaces
└── infrastructure # Infrastructure layer
    ├── persistence # Data access layer
    │   ├── drizzle
    │   │   ├── schemas # Database schemas
    │   └── repositories # Data repositories
    └── services # External services
```

## Continuous Integration and Deployment

This template includes a Continuous Integration (CI) setup using GitHub Actions, along with a basic Continuous Deployment (CD) step for Docker images.

### CI Workflow

The CI process consists of three main jobs:

1. **Lint**: Runs the project's linting checks.
2. **Build**: Ensures the project builds successfully.
3. **Test**: Executes the project's test suite.

Each job uses Node.js version 20.16.0 and pnpm 9.6.0 for consistency.

### Continuous Deployment (CD)

This template includes a CD workflow that automatically builds and pushes a Docker image to GitHub Container Registry (ghcr.io) when changes are pushed to the master branch and the CI workflow passes.

Key features of the CD workflow:

- Triggers after successful completion of the CI workflow on the master branch.
- Builds the Docker image using the production Dockerfile (`./docker/production/Dockerfile`).
- Builds for both amd64 and arm64 architectures.
- Pushes the image to GitHub Container Registry with appropriate tags and labels.

To use this CD workflow:

1. Ensure you have set up the `GHCR_PAT` secret in your repository settings with a Personal Access Token that has package write permissions.
2. Verify that your production Dockerfile is located at `./docker/production/Dockerfile`.

Note: This CD workflow provides a solid starting point for containerized deployments. Depending on your specific hosting environment, you may need to add additional steps for actual deployment to your production environment.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
