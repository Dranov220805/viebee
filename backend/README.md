# VieBee Main Backend Service (NestJS Clean Architecture) 🏛️

> **Role:** Core business logic, P2P workshop management, instant RSVP booking, 12% fee calculation, and AI microservice proxy.  
> **Tech Stack:** NestJS 11 • TypeScript • Clean Layered Architecture • Swagger OpenAPI 3.0  
> **Affiliation:** UEH University of Economics Ho Chi Minh City • UII Sandbox 2026

---

## 🏛️ System Topology: Two-Tier Backend Service

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VieBee Backend Topology                         │
└────────────────────────────────────────────────────────────────────────┘

  [ Client: Next.js 16 Web App (:3000) ]
        │
        │ REST API + Bearer JWT
        ▼
  [ Main Backend Service: NestJS 11 (:4000) ]
        ├── VB.VieBeeService.HttpApi             (Controllers, Interceptors, Filters)
        ├── VB.VieBeeService.Application.Contracts (Input & Output DTOs, Swagger types)
        ├── VB.VieBeeService.Application         (Use-case Services: Workshop, Booking, QC)
        ├── VB.VieBeeService.Domain              (Entities, Repository Interfaces)
        ├── VB.VieBeeService.Domain.Shared       (Enums, Error Codes, BusinessException)
        └── VB.VieBeeService.Infrastructure      (In-Memory Seed Repositories, Prisma)
        │
        │ HTTP REST Proxy (/copilot/chat, /copilot/translate)
        ▼
  [ AI Cultural Copilot Microservice: Python FastAPI (:8000) ]
        ├── LangChain + RAG Pipeline
        ├── Verified Heritage Workshop Knowledge Sheets
        └── Bilateral Translation (English <-> Respectful Southern Vietnamese)
```

---

## 📁 Layered Clean Architecture

Modeled strictly after the team's enterprise backend template:

| Layer | Namespace & Path Alias | Contents |
|---|---|---|
| **Domain** | `VB.VieBeeService.Domain` (`@domain/*`) | `BaseEntity`, `UserEntity`, `WorkshopEntity`, `WorkshopSlotEntity`, `BookingEntity`, `ReviewEntity`, and `I*Repository` interfaces. Zero external dependencies. |
| **Domain.Shared** | `VB.VieBeeService.Domain.Shared` (`@domain-shared/*`) | `UserRole`, `BookingStatus`, `VerificationStatus`, `ErrorCode`, and `BusinessException` factory methods. |
| **Application.Contracts** | `VB.VieBeeService.Application.Contracts` (`@application-contracts/*`) | Input and Output DTOs with explicit `@ApiProperty({ type: ... })` definitions for OpenAPI documentation. |
| **Application** | `VB.VieBeeService.Application` (`@application/*`) | `WorkshopService`, `BookingService` (with capacity validation and 12% take rate), `CopilotService` (AI proxy), `AuthService`, `QcService`. |
| **Infrastructure** | `VB.VieBeeService.Infrastructure` (`@infrastructure/*`) | `REPOSITORY_TOKENS`, `WorkshopInMemoryRepository` (seeded with 6 authentic workshops), `BookingInMemoryRepository`, `UserInMemoryRepository`, `PrismaService`. |
| **HttpApi** | `VB.VieBeeService.HttpApi` (`@http-api/*`) | `WorkshopsController`, `BookingsController`, `CopilotController`, `QcController`, `AuthController`, `TransformResponseInterceptor`, `HttpExceptionFilter`, `JwtGuard`. |

---

## 🚀 Running the Main Backend Service

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start in Development Mode
```bash
npm run start:dev
```

- **API Base URL:** `http://localhost:4000/api`
- **Interactive Swagger Docs:** `http://localhost:4000/api-docs`

---

## 🤖 Running the Python FastAPI AI Service

In a separate terminal:
```bash
cd ai-service
pip install -r requirements.txt
python run.py
```

- **AI Service Base URL:** `http://localhost:8000`
- **AI Service Swagger Docs:** `http://localhost:8000/docs`
