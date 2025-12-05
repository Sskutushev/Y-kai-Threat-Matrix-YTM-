# Yōkai Threat Matrix

## Overview

The Yōkai Threat Matrix is a single-page application (SPA) designed for the real-time monitoring of spiritual anomalies, known as yōkai. It provides a dynamic dashboard that tracks anomaly data, supports a capture workflow with optimistic UI updates, and displays live threat-level changes via Server-Sent Events (SSE).

This project is built with a modern technology stack and adheres to the Feature-Sliced Design (FSD) architecture to ensure maintainability, scalability, and a clear separation of concerns.

## Core Features

*   **Real-Time Dashboard**: Displays a live grid of anomalies with essential data points, including name, location, status, and threat level.
*   **Live Threat Updates**: Utilizes Server-Sent Events (SSE) to push threat-level changes to all connected clients every 5 seconds without requiring a page refresh.
*   **Capture Mechanism**: Allows users to "capture" an anomaly, triggering an optimistic UI update for immediate feedback. The backend simulates a 30% failure rate for this operation, with the UI correctly rolling back on error.
*   **Structured Project Architecture**: Implements Feature-Sliced Design (FSD) for a highly organized and scalable codebase.

## Technical Stack

*   **Framework**: Next.js (App Router)
*   **Language**: TypeScript
*   **Architecture**: Feature-Sliced Design (FSD)
*   **Server State & Caching**: TanStack Query (React Query v5)
*   **Styling**: SCSS Modules with a BEM-like naming convention. No utility-first CSS frameworks are used.
*   **Data Validation**: Zod for runtime data validation and type inference.
*   **Testing**: Jest for unit/integration tests and Playwright for end-to-end tests.
*   **Deployment**: Docker for containerization and Vercel for hosting.

## Getting Started

### Prerequisites

*   Node.js (version 18.x or later)
*   npm or a compatible package manager
*   Docker and Docker Compose (for containerized execution)

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

The application will be accessible at `http://localhost:3000`.

### Docker Execution

1.  **Build and run the containers:**
    ```sh
    docker-compose up --build
    ```

The application will be accessible at `http://localhost:3000`.

## Testing

This project employs a multi-layered testing strategy to ensure code quality and application stability.

*   **Unit & Integration Tests**: Run all Jest tests, which cover individual components, API route logic, and utility functions.
    ```sh
    npm test
    ```

*   **End-to-End (E2E) Tests**: Run full user workflow simulations using Playwright. This requires the application to be running.
    ```sh
    npm run test:e2e
    ```

## Architectural Overview

The codebase is organized according to **Feature-Sliced Design (FSD)** principles, which divide the application into distinct layers and slices. This structure enhances modularity and simplifies maintenance.

```
src/
├── app/         # Global configuration, styles, providers, and API routes
├── pages/       # Page-level components that compose widgets and features
├── widgets/     # Composite UI components (e.g., AnomalyDashboard)
├── features/    # User-facing functionality (e.g., capture-anomaly)
├── entities/    # Core business objects and their UI representations (e.g., AnomalyCard)
└── shared/      # Reusable code, UI components, and utilities (e.g., Button, API client)
```

For a more detailed explanation of the architecture, please refer to the `docs/architecture.md` file.

## CI/CD Pipeline

The repository is configured with a GitHub Actions workflow that automates testing and deployment.

1.  **Testing Job**: On every push or pull request to `main`, the pipeline runs linting checks, unit tests, and integration tests.
2.  **E2E Job**: Following successful tests, end-to-end tests are executed using Playwright.
3.  **Deployment Job**: If all tests pass on a push to the `main` branch, the application is automatically deployed to Vercel.

Git hooks are managed by Husky to enforce conventional commit messages and run pre-commit checks.

## Available Scripts

*   `dev`: Starts the Next.js development server.
*   `build`: Creates a production-ready build of the application.
*   `start`: Starts the production server.
*   `lint`: Runs the ESLint code analyzer.
*   `test`: Executes all Jest unit and integration tests.
*   `test:e2e`: Runs all Playwright end-to-end tests.
*   `format`: Formats all code using Prettier.
*   `prepare`: Installs Husky git hooks.
