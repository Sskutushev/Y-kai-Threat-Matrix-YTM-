# Application Architecture

This document provides a high-level overview of the architectural design of the Yōkai Threat Matrix application.

## Core Philosophy: Feature-Sliced Design (FSD)

The project is built upon the principles of **Feature-Sliced Design (FSD)**, a methodology for structuring web applications to enhance scalability, maintainability, and developer experience. FSD organizes the codebase by business domains (slices) rather than technical concerns (e.g., "components", "hooks").

### Layered Structure

The architecture is composed of distinct layers, each with a specific responsibility. A strict dependency rule is enforced: a layer can only depend on layers below it.

1.  **`pages`**: The top-most layer, responsible for composing UI layouts for specific application routes. It assembles components from the layers below.
2.  **`widgets`**: Complex, standalone UI components that provide significant user value (e.g., the main `AnomalyDashboard`). They combine features and entities into a single block.
3.  **`features`**: Implements user-facing functionality and business scenarios, such as capturing an anomaly or handling real-time updates.
4.  **`entities`**: Represents core business objects of the application (e.g., an `Anomaly`). This layer includes data structures, data-fetching logic, and UI components that represent the entity.
5.  **`shared`**: The foundational layer containing code that is universally reusable across the application. This includes the UI kit (buttons, cards), API clients, utility functions, and global style definitions.

This layered approach prevents circular dependencies and ensures a predictable, one-way data flow.

## Technology & Data Flow

### State Management

*   **Server State**: **TanStack Query (React Query v5)** is the primary tool for managing server state. It handles all data fetching, caching, and synchronization, including background refetching and request deduplication.
*   **Optimistic Updates**: For critical user actions like "capturing" an anomaly, the UI is updated instantly before receiving server confirmation. The state is automatically rolled back if the server returns an error, providing a seamless user experience.
*   **Real-Time State**: Live updates are managed via **Server-Sent Events (SSE)**. A custom hook (`useAnomalySSE`) subscribes to the SSE stream and directly injects updates into the TanStack Query cache, ensuring efficient, targeted re-renders without full page reloads.

### Styling Architecture

The project uses a pure **SCSS Module** approach for styling.
*   **Component Scoping**: Every component has its own `.module.scss` file, ensuring styles are locally scoped and do not leak.
*   **Global Variables & Mixins**: A shared `styles` directory contains global SCSS variables (for colors, spacing, etc.) and reusable mixins, ensuring a consistent design system.
*   **No Utility-First Frameworks**: The styling is implemented from the ground up without relying on frameworks like Tailwind CSS.

### API & Data Handling

*   **API Endpoints**: The backend is implemented using **Next.js API Routes** located within the `src/app/api/` directory.
*   **Mock Database**: For development and testing, an in-memory database is used. It is attached to the `global` object in Node.js to persist its state across hot reloads.
*   **Data Validation**: **Zod** is used to define validation schemas for all incoming and outgoing data. This ensures runtime type safety at the API boundary and provides a single source of truth for data structures, from which TypeScript types are inferred.

## Key Architectural Decisions

*   **FSD for Maintainability**: Chosen to manage complexity as the application grows and to provide a clear, scalable structure.
*   **TanStack Query for Server State**: Selected for its powerful caching capabilities and features like optimistic updates, which are central to the application's UX.
*   **Server-Sent Events over WebSockets**: SSE was chosen for its simplicity and efficiency for the one-way, server-to-client data flow required for live threat updates.
*   **Strict Validation with Zod**: Ensures data integrity throughout the application, from the API layer to the UI, reducing runtime errors.
