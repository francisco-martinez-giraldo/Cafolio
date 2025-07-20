# Cafolio App — Technical Specifications

## Frontend

- **Framework:** TanStack Start

  - Utilizes file-based routing, React Server Components, and seamless integration with modern React features.

- **UI Components:** Shadcn UI (ChadSN)

  - Accessible and customizable React components, styled with Tailwind CSS.

- **Styling:** Tailwind CSS

  - Utility-first CSS framework for fast, responsive design and easy maintainability.

- **Data Fetching:** React Query

  - Handles all remote data fetching, caching, and background synchronization.

- **HTTP Client:** Axios

  - Promise-based HTTP client for API communication.

- **State Management:** Jotai
  - Atomic state management for fine-grained local and global state handling in React.

---

## Backend

- **Language:** TypeScript

  - Ensures type safety and code consistency across the codebase.

- **Backend Platform:** Supabase

  - PostgreSQL database with built-in authentication, REST/GraphQL APIs, real-time features, and file storage.

- **Testing:** JEs

  - For unit and integration testing of backend logic and APIs.

- **API Documentation:** Swagger (OpenAPI)
  - Generates interactive documentation for all API endpoints.

---

## Proposed Tech Stack Summary

| Layer         | Technology            |
| ------------- | --------------------- |
| Frontend      | TanStack Start        |
| UI Components | Shadcn UI (ChadSN)    |
| Styling       | Tailwind CSS          |
| Data Fetching | React Query           |
| HTTP Client   | Axios                 |
| State Mgmt    | Jotai                 |
| Backend       | TypeScript + Supabase |
| Testing       | Jest                  |
| API Docs      | Swagger (OpenAPI)     |

---

## Additional Guidelines

- **Project Structure:**
  - Modular, feature-based folders (e.g., `/features/beans`, `/features/brews`).
- **Separation of Concerns:**
  - Keep business logic, API calls, and UI components separated for maintainability.
- **Continuous Integration:**
  - Automated unit tests and deployments.
- **Documentation:**
  - All API endpoints documented with Swagger for easy frontend-backend
