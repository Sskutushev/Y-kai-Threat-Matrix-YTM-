# CI/CD and Deployment

This document outlines the Continuous Integration (CI) and Continuous Deployment (CD) pipeline for the Yōkai Threat Matrix project. The primary goal of the pipeline is to automate quality assurance and ensure stable, consistent deployments.

## CI/CD Provider: GitHub Actions

The entire CI/CD process is managed through a GitHub Actions workflow defined in `.github/workflows/ci-cd.yml`.

### Workflow Triggers

The workflow is automatically triggered by the following events:
*   A `push` to the `main` or `develop` branches.
*   A `pull_request` targeting the `main` branch.

### Pipeline Jobs

The workflow consists of three sequential jobs that act as quality gates. Each job must pass for the pipeline to proceed to the next.

1.  **`test` (Test & Lint)**
    *   **Purpose**: To validate code quality and correctness.
    *   **Actions**:
        *   Installs dependencies using `npm ci` for fast, reliable builds.
        *   Runs the ESLint static analyzer (`npm run lint`).
        *   Executes all Jest unit and integration tests (`npm test`).
        *   Builds the application (`npm run build`) to detect any build-time errors.

2.  **`e2e` (End-to-End Tests)**
    *   **Purpose**: To verify critical user flows in a real browser environment.
    *   **Dependency**: This job only runs if the `test` job completes successfully.
    *   **Actions**:
        *   Installs Playwright browser binaries.
        *   Runs the full suite of E2E tests (`npm run test:e2e`).
        *   Uploads the Playwright test report as a workflow artifact for inspection.

3.  **`deploy` (Deploy to Production)**
    *   **Purpose**: To deploy the application to the production environment.
    *   **Condition**: This job only runs on a `push` to the `main` branch and if both the `test` and `e2e` jobs have passed.
    *   **Actions**:
        *   Uses the official Vercel GitHub Action to deploy the application.
        *   Requires `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` to be configured as secrets in the GitHub repository.

## Local Development Quality Gates

To maintain code quality before it reaches the CI pipeline, several local development tools are enforced via **Husky** git hooks.

*   **`pre-commit`**: Before a commit is created, this hook runs `lint-staged`. This automatically lints, formats, and runs relevant unit tests on only the files that have been staged for the commit. This prevents broken or poorly formatted code from entering the repository.

*   **`commit-msg`**: This hook validates that the commit message adheres to the **Conventional Commits** specification. This ensures a clean, readable, and automated-friendly git history.

## Deployment Environment

The application is deployed to **Vercel**.
*   **Production**: The `main` branch is automatically deployed to the production environment.
*   **Preview**: Vercel automatically generates preview deployments for all pull requests, allowing for easy review of changes before they are merged.
