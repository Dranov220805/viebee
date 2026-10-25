# 01 — System Architecture & Topology 🏛️

VieBee employs a decoupled, enterprise architecture designed to support both autonomous frontend prototyping (via browser storage) and high-scale production deployment (via NestJS and PostgreSQL).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VieBee System Topology                          │
└────────────────────────────────────────────────────────────────────────┘

 [ Client Browser: Next.js 16 (React 19) ]
   ├── Presentation Layer (Tailwind v4 + Ant Design v6 + Framer Motion)
   ├── State Management (Redux Toolkit store)
   └── Data Access Layer:
        ├── Production Mode: Axios HTTP Client ──> [ Main Backend: NestJS 11 (Port 4000) ]
        └── Prototype Mode: mockHttpAdapter   ──> [ LocalStorage / SessionStorage ]

 [ Main Backend: NestJS 11 (Port 4000) ]
   ├── VB.VieBeeService.HttpApi             (REST Controllers, Guards, Interceptors)
   ├── VB.VieBeeService.Application.Contracts (Input/Output DTOs with Swagger)
   ├── VB.VieBeeService.Application         (Use-Case Services, 12% Take Rate, Capacity)
   ├── VB.VieBeeService.Domain              (Entities, Repository Interfaces)
   ├── VB.VieBeeService.Domain.Shared       (Enums, Error Codes, BusinessException)
   └── VB.VieBeeService.Infrastructure      (In-Memory Repositories with 6 Seed Workshops, Prisma)
        │
        │ REST HTTP Proxy (/copilot/chat, /copilot/translate)
        ▼
 [ AI Microservice: Python FastAPI (Port 8000) ]
   ├── LangChain + RAG Retrieval Pipeline
   ├── Bilateral Translation (English <-> Respectful Southern Vietnamese)
   └── Grounded Heritage Knowledge Sheets (Allergens, Etiquette, Lore)
```

---

## 1. Frontend Subsystem (`viebee/`)

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5.
- **UI & Design Tokens:**
  - **Ant Design v6:** For accessible, complex components (Modals, Selects, Drawers, Steps, Tables).
  - **Tailwind CSS v4:** For layout, responsive design, and heritage micro-animations.
  - **Cultural Palette:** Honey Gold (`#f59e0b`, `#d97706`), Terracotta Cinnabar (`#c2410c`), Deep Vietnamese Indigo (`#1e1b4b`), Warm Rice Paper Cream (`#fdfbf7`).
- **Autonomous Mock Adapter:**
  - Located at `src/@core/http/mock-adapter.ts`.
  - Persists workshops, RSVPs, copilot chat history, and active user profiles in `localStorage` without requiring the NestJS backend to be running.
  - Returns identical `{ status, statusCode, message, data }` response envelopes.

---

## 2. Backend Subsystem (`backend/`)

- **Framework:** NestJS 11 + TypeScript + Express.
- **Layered Clean Architecture:**
  - **`domain/`**: Pure TypeScript entities and repository contracts. No framework dependencies.
  - **`application/`**: Use cases (create workshop, reserve RSVP, query AI copilot) and class-validator DTOs.
  - **`infrastructure/`**: Prisma repositories for PostgreSQL, SQLite local fallback, LangChain RAG vector lookup.
  - **`http-api/`**: Thin presentation controllers with Swagger OpenAPI decorators, `TransformResponseInterceptor`, and `HttpExceptionFilter`.
