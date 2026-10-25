# 02 — Technology Stack & Dependencies 🛠️

## 1. Frontend (`viebee/`)

| Technology / Library | Pinned Version | Architectural Role | Rationale |
|---|---|---|---|
| **Next.js** | `16.1.1` | Core React Framework | App Router, Server Components, production bundle optimization. |
| **React & React-DOM** | `19.2.3` | View Engine | Concurrent rendering, fast virtual DOM diffing. |
| **Ant Design (AntD)** | `^6.2.0` | UI Component System | Enterprise-ready, accessible interactive widgets (Modal, Step, Form, Table). |
| **Tailwind CSS** | `^4.0.0` | Utility CSS Engine | Native PostCSS v4 engine for bespoke heritage styling and responsive design. |
| **@reduxjs/toolkit** | `^2.5.0` | Global State Store | Predictable state slices for Auth, Workshop filters, and Copilot messages. |
| **Lucide React** | `^1.16.0` | Iconography | Clean, modern vector icons for GIS map, tickets, and AI badges. |
| **Day.js** | `^1.11.13` | Date Manipulation | Lightweight ISO date/time formatting for workshop schedule slots. |
| **Axios** | `^1.13.5` | HTTP Client | Centralized instance with response interceptors and mock fallback. |

---

## 2. Backend (`backend/`)

| Technology / Library | Pinned Version | Architectural Role | Rationale |
|---|---|---|---|
| **NestJS Core & Common** | `^11.0.0` | Enterprise Node.js Framework | Robust dependency injection, clean modular architecture. |
| **@nestjs/swagger** | `^11.0.0` | API Documentation | Automatic OpenAPI 3.0 interactive specification mounted at `/api-docs`. |
| **Prisma ORM** | `^6.4.0` | Database Client & Migrations | Type-safe queries, PostgreSQL & SQLite compatibility. |
| **Class Validator & Transformer** | `^0.14.1` / `^0.5.1` | DTO Validation Pipes | Declarative runtime validation of all incoming REST inputs. |
| **Passport & JWT** | `^11.0.0` | Authentication & Security | Stateless Bearer token verification with role guards. |

---

## 3. AI Copilot Microservice (`ai-service/`)

| Technology / Library | Pinned Version | Architectural Role | Rationale |
|---|---|---|---|
| **Python** | `3.11+` | Core AI Runtime | Industry standard for AI/ML, NLP, and LLM integrations. |
| **FastAPI** | `^0.115.0` | Async Python Web Framework | Ultra high-performance ASGI API with native OpenAPI docs at `/docs`. |
| **Uvicorn** | `^0.30.0` | ASGI Web Server | Lightning-fast async worker handling concurrent AI chat requests. |
| **Pydantic v2** | `^2.8.0` | Data Validation & Schema | High-speed C-extension validation for AI requests and knowledge sheets. |
| **HTTPX** | `^0.27.0` | Async HTTP Client | Non-blocking remote model calling (OpenAI / Gemini) with timeout control. |
