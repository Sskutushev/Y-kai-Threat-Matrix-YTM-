# Testing Strategy

This document provides an overview of the testing strategy for the Yōkai Threat Matrix application, which is designed to ensure code quality, prevent regressions, and verify application functionality.

## Testing Philosophy

The project adheres to the principles of the Testing Pyramid, which emphasizes a balanced distribution of tests across different levels of granularity. The majority of tests are fast, low-level unit tests, with fewer, more comprehensive tests at the higher levels.

```
      / \
     /   \  <-- End-to-End (E2E) Tests (Few)
    /-----
   /       \  <-- Integration Tests (More)
  /---------
 /           \ <-- Unit Tests (Many)
/-------------
```

## Test Categories

### 1. Unit Tests

*   **Location**: `tests/unit/`
*   **Purpose**: To verify the smallest, most isolated pieces of code (units), such as individual React components, utility functions, or custom hooks.
*   **Characteristics**:
    *   They are fast and provide immediate feedback.
    *   External dependencies and side effects (like API calls) are mocked.
    *   Focus on component rendering, business logic, and schema validation.
*   **Tools**: Jest, React Testing Library, MSW (for mocking).

### 2. Integration Tests

*   **Location**: `tests/integration/`
*   **Purpose**: To verify the interaction between different parts of the application. In this project, they primarily focus on testing the API routes.
*   **Characteristics**:
    *   They test the full request/response cycle of an API endpoint, including its interaction with the in-memory database.
    *   They run in a Node.js environment to accurately simulate the backend.
    *   They ensure that data contracts between the client and server are met.
*   **Tools**: Jest.

### 3. End-to-End (E2E) Tests

*   **Location**: `tests/e2e/`
*   **Purpose**: To simulate complete user workflows from start to finish in a real browser environment.
*   **Characteristics**:
    *   They validate the application from the user's perspective (e.g., "a user can see the dashboard, capture an anomaly, and see the UI update").
    *   They are slower and more brittle than lower-level tests but provide the highest level of confidence.
*   **Tools**: Playwright.

## Testing Tools

*   **Jest**: The core test runner for unit and integration tests.
*   **React Testing Library**: A library for testing React components in a way that encourages good testing practices and focuses on user-centric interactions.
*   **Playwright**: A modern, powerful framework for end-to-end testing that runs tests across all major browsers.
*   **Mock Service Worker (MSW)**: Used in unit tests to intercept network requests and provide mock responses, allowing for isolated testing of data-fetching components and hooks.

## How to Run Tests

The following scripts are available to execute the tests:

*   **Run all Jest tests (Unit & Integration)**:
    ```sh
    npm test
    ```
    This command will also generate a code coverage report.

*   **Run End-to-End tests**:
    *(Requires a running instance of the application)*
    ```sh
    npm run test:e2e
    ```

*   **Run tests in watch mode**:
    ```sh
    npm run test:watch
    ```
