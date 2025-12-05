# CI/CD and Deployment

This document outlines the Continuous Integration (CI) and Continuous Deployment (CD) pipeline for the Yokai Threat Matrix project. The main goal is to automate quality checks and ensure stable deployments.

## CI/CD Provider: GitHub Actions

The CI/CD process uses a GitHub Actions workflow defined in `.github/workflows/ci-cd.yml`.

### Workflow Triggers

The workflow runs automatically when:
*   Code is `pushed` to `master` or `develop` branches.
*   A `pull request` is made targeting the `master` branch.

### Pipeline Jobs

The workflow has two main jobs that act as quality gates. Both must pass for the pipeline to succeed.

1.  **`test` (Test & Lint)**
    *   **Purpose**: Checks code quality and correctness.
    *   **Steps**:
        *   Installs dependencies (`npm ci`).
        *   Runs ESLint (`npm run lint`).
        *   Executes Jest unit and integration tests (`npm test`).
        *   Builds the application (`npm run build`) to find build errors.

2.  **`e2e` (End-to-End Tests)**
    *   **Purpose**: Verifies important user flows in a real browser.
    *   **Requirement**: Runs only if the `test` job is successful.
    *   **Steps**:
        *   Installs Playwright browser tools.
        *   Runs all E2E tests (`npm run test:e2e`).
        *   Uploads the Playwright test report as an artifact.

## Local Development Quality Checks

To maintain code quality before it reaches CI, **Husky** git hooks are used:

*   **`pre-commit`**: Before a commit, this hook runs `lint-staged`. It checks and formats staged files, and runs relevant unit tests.
*   **`commit-msg`**: This hook ensures commit messages follow **Conventional Commits** rules for a clear Git history.

## Deployment

The application is deployed to **Vercel**.
*   **Production**: The `master` branch is automatically deployed to production.
*   **Preview**: Vercel creates preview deployments for all pull requests, allowing easy review of changes.