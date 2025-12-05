# Testing Strategy

This document describes the testing strategy for the Yokai Threat Matrix application. Its goal is to ensure code quality, prevent errors, and confirm that the application works as expected.

## Testing Philosophy

The project uses the Testing Pyramid model. This means most tests are fast, low-level unit tests, with fewer, more complex tests at higher levels.

### Test Categories

#### 1. Unit Tests

*   **Location**: `tests/unit/`
*   **Purpose**: To check the smallest parts of the code in isolation (e.g., React components, functions, hooks).
*   **Key points**: Fast, give quick feedback. External services (like APIs) are mocked. Focus on UI rendering and logic.
*   **Tools**: Jest, React Testing Library, MSW.

#### 2. Integration Tests

*   **Location**: `tests/integration/`
*   **Purpose**: To check how different parts of the application work together. For this project, they mainly test API routes.
*   **Key points**: Test full API request/response cycles. Use an in-memory database. Ensure data contracts are correct.
*   **Tools**: Jest.

#### 3. End-to-End (E2E) Tests

*   **Location**: `tests/e2e/`
*   **Purpose**: To simulate complete user tasks in a real browser.
*   **Key points**: Confirm the application works from the user's view (e.g., "user can see dashboard, capture anomaly"). Slower but offer high confidence.
*   **Tools**: Playwright.

## Testing Tools

*   **Jest**: The main tool for running unit and integration tests.
*   **React Testing Library**: For testing React components, focusing on user interactions.
*   **Playwright**: A modern framework for E2E testing across major browsers.
*   **Mock Service Worker (MSW)**: Used in unit tests to mock network requests, allowing isolated testing.

## How to Run Tests

Use these scripts to run tests:

*   **Run all Jest tests (Unit & Integration)**:
    ```sh
    npm test
    ```
    This command also creates a code coverage report.

*   **Run End-to-End tests**:
    ```sh
    npm run test:e2e
    ```
    (The application must be running for these tests to work.)