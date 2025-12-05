# Yokai Threat Matrix

## Overview

The Yokai Threat Matrix is a Single-Page Application (SPA) designed for real-time monitoring of spiritual anomalies, known as Yokai. It features a dynamic dashboard to track anomaly data, an optimistic UI capture workflow, and live threat level updates via Server-Sent Events (SSE).

The project uses a modern technology stack and follows the Feature-Sliced Design (FSD) architecture for maintainability, scalability, and clear separation of concerns.

## Core Features

*   **Real-Time Dashboard**: Displays anomalies with details like name, location, status, and threat level.
*   **Live Threat Updates**: Threat levels are updated every 5 seconds using Server-Sent Events (SSE), without page refresh.
*   **Capture Mechanism**: Users can "capture" Yokai. The UI updates immediately, and the backend simulates a 30% failure rate with error rollback.
*   **Structured Architecture**: Implements Feature-Sliced Design (FSD) for an organized and scalable codebase.

## Technical Stack

*   **Framework**: Next.js (App Router)
*   **Language**: TypeScript
*   **Architecture**: Feature-Sliced Design (FSD)
*   **State & Caching**: TanStack Query (React Query v5)
*   **Styling**: SCSS Modules (BEM-like naming)
*   **Data Validation**: Zod
*   **Testing**: Jest (unit/integration) and Playwright (end-to-end)
*   **Deployment**: Docker and Vercel

## Getting Started

### Prerequisites

*   Node.js (v18.x or newer)
*   npm
*   Docker and Docker Compose (optional, for containerized setup)

### Local Development

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Sskutushev/Y-kai-Threat-Matrix-YTM-.git
    cd yokai-threat-matrix-app
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

### Docker Execution

1.  **Build and run containers:**
    ```sh
    docker-compose up --build
    ```
    The application will be available at `http://localhost:3000`.

## Testing

The project uses a multi-layered testing strategy:

*   **Unit & Integration Tests**: Jest tests cover components, API routes, and utility functions.
    ```sh
    npm test
    ```
*   **End-to-End (E2E) Tests**: Playwright simulates user workflows. The application must be running for these tests.
    ```sh
    npm run test:e2e
    ```

## Architectural Overview

The codebase follows Feature-Sliced Design (FSD) principles, organizing the application into distinct layers and slices. This improves modularity and simplifies maintenance.

```
src/
├── app/         # Global configuration, styles, providers, API routes
├── pages/       # Page components (composing widgets and features)
├── widgets/     # Composite UI blocks (e.g., AnomalyDashboard)
├── features/    # User functionality (e.g., capture-anomaly)
├── entities/    # Core business objects (e.g., AnomalyCard)
└── shared/      # Reusable code, UI components, utilities (e.g., Button, API client)
```

For more details on architecture, refer to `docs/architecture.md`.

## CI/CD Pipeline

The repository includes a GitHub Actions workflow for automated testing.

1.  **Testing Job**: Runs linting, unit, and integration tests on every push or pull request to the `master` or `develop` branch.
2.  **E2E Job**: Executes end-to-end tests using Playwright after successful testing.
3.  **Deployment**: Vercel handles automatic deployment to production for pushes to the `master` branch via its native GitHub integration.

Git hooks managed by Husky enforce conventional commit messages and pre-commit checks.

## Available Scripts

*   `dev`: Starts the Next.js development server.
*   `build`: Creates a production build.
*   `start`: Starts the production server.
*   `lint`: Runs ESLint.
*   `test`: Executes Jest unit and integration tests.
*   `test:e2e`: Runs Playwright end-to-end tests.
*   `format`: Formats code using Prettier.
*   `prepare`: Installs Husky git hooks.