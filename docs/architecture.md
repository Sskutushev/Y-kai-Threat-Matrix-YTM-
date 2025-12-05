# Application Architecture

This document provides a high-level overview of the Yokai Threat Matrix application's architectural design.

## Core Principle: Feature-Sliced Design (FSD)

The project uses **Feature-Sliced Design (FSD)** to structure the application. FSD helps improve scalability, maintainability, and the developer experience by organizing code around business domains rather than technical types.

### Layered Structure

The architecture has clear layers, each with a specific role. A layer can only use features from layers below it.

1.  **`pages`**: The highest layer, building UI layouts for specific app routes by combining components from lower layers.
2.  **`widgets`**: Complex, self-contained UI components that offer significant user functionality (e.g., the `AnomalyDashboard`). They combine features and entities.
3.  **`features`**: Implements user actions and business tasks, such as capturing an anomaly or handling real-time data.
4.  **`entities`**: Represents the main business objects (e.g., an `Anomaly`). This includes data structures, data loading, and UI parts for the entity.
5.  **`shared`**: The base layer with code reusable across the application. This includes UI components (buttons, cards), API clients, utility functions, and global styles.

This layered approach prevents unwanted dependencies and ensures a predictable data flow.

## Technology & Data Flow

### State Management

*   **Server State**: **TanStack Query (React Query v5)** manages server data. It handles data fetching, caching, and syncing, including background updates.
*   **Optimistic Updates**: For actions like "capturing" an anomaly, the UI updates instantly before server confirmation. If an error occurs, the UI reverts automatically.
*   **Real-Time State**: **Server-Sent Events (SSE)** provide live updates. A special hook (`useAnomalySSE`) receives SSE data and updates the TanStack Query cache, leading to efficient UI changes.

### Styling

The project uses **SCSS Modules**.
*   **Component Styling**: Each component has its own `.module.scss` file, keeping styles local.
*   **Global Styles**: A `shared/styles` folder contains global SCSS variables (for colors, spacing) and reusable mixins for consistent design.
*   **No Frameworks**: Styling is custom-made without frameworks like Tailwind CSS.

### API & Data Handling

*   **API Endpoints**: Next.js API Routes handle the backend, located in `src/app/api/`.
*   **Mock Database**: An in-memory database, stored globally, is used for development and testing. It keeps its state during hot reloads.
*   **Data Validation**: **Zod** defines validation rules for all incoming and outgoing data, ensuring type safety and consistent data structures.

## Key Architectural Choices

*   **FSD**: Chosen for a clear, scalable structure that helps with app growth and maintenance.
*   **TanStack Query**: Selected for its strong caching and optimistic update features, crucial for the user experience.
*   **Server-Sent Events**: Picked for its simplicity and efficiency for one-way, real-time data flow.
*   **Zod Validation**: Ensures data quality across the application, reducing errors.