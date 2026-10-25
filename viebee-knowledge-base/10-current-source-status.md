# 10 — Current Source Status & Gap Analysis 🔍

> **Audit Date:** October 25, 2026 (Milestone 2 / Workshop #3 Review)  
> **Source Base:** `viebee/` (Next.js 16 + React 19 Frontend) & `backend/` (NestJS 11 Clean Architecture)  
> **Evaluator Context:** UEH UII Sandbox 2026 — Milestone Presentation (27/10/2026)

---

## 1. Executive Status Overview

| Subsystem / Feature | Current Implementation Status | Data Source | Readiness Level |
|---|---|---|---|
| **GIS Cultural Map** (`/cultural-map`) | Functional UI with category/district filters + drawer, but map is an OpenStreetMap static embed. | `mockHttpAdapter` + `localStorage` | **70% (Prototype)** — needs dynamic pin overlay. |
| **Workshop Browsing & Detail** (`/workshops`, `/workshops/:id`) | Fully functional with 6 curated heritage workshops, bilingual descriptions, RAG sheets, and fee calculator. | `mockHttpAdapter` + `localStorage` | **95% (High-Fidelity MVP)**. |
| **Instant RSVP & Ticket Passes** (`/traveler/bookings`) | Instant booking flow, QR electronic ticket pass generation, status badges, host payout breakdown (88%/12%). | `mockHttpAdapter` + `localStorage` | **90% (MVP)** — needs slot capacity validation. |
| **Host 3-Step Listing Tool** (`/host/create-workshop`) | 3-step listing wizard with direct payout preview, automated schedule slot generator, and instant submission. | `mockHttpAdapter` + `localStorage` | **90% (MVP)**. |
| **Host Dashboard** (`/host/dashboard`) | Financial metrics (88% net earnings), guest reservation management, upcoming schedule list. | `mockHttpAdapter` + `localStorage` | **85% (MVP)**. |
| **AI Cultural Copilot** (`/copilot`) | Bilateral translation simulator (EN ↔ VI) + verified workshop sheet Q&A + etiquette tips. | `mockHttpAdapter` (Simulated RAG) | **75% (PoC / Prototype)** — simulated response tree. |
| **QC Verification & Moderation** (`/admin/verification`) | Host credential inspection, on-site space criteria checklist, one-click QC badge approval. | `mockHttpAdapter` + `localStorage` | **90% (MVP)**. |
| **Backend REST API** (`backend/src`) | NestJS controllers & DTOs scaffolded for `/workshops`, `/bookings`, `/copilot`. | In-memory arrays (Volatile Node.js RAM) | **40% (Scaffold)** — disconnected from Prisma & frontend. |
| **Database & ORM** (`backend/prisma`) | Prisma schema with 5 models (`User`, `Workshop`, `WorkshopSlot`, `Booking`, `Review`). | Unconnected | **30% (Schema only)**. |

---

## 2. Source Code Health & Architecture Gap Analysis

### 2.1. Frontend-Backend Disconnect
- **Current State:** The Next.js frontend services (`src/services/viebee-service/*`) directly invoke `mockHttpAdapter`. The centralized Axios client in `src/@core/http/index.ts` is bypassed.
- **Impact:** The web application runs 100% autonomously in the browser without needing the NestJS backend, which is great for offline judging and demo stability. However, the NestJS backend code is currently inactive in the client bundle.
- **Short-term Decision:** Maintain the robust `mockHttpAdapter` as default for the 25/10/2026 slide submission and 27/10/2026 live presentation, with a feature flag `NEXT_PUBLIC_USE_BACKEND=true` to switch to live API.

### 2.2. Critical Logic Gaps (Must Fix)
1. **Slot Capacity Check:** Neither frontend nor backend currently verifies `(slot.bookedCount + guestsCount) <= slot.capacity`. A user can book a full slot or select more guests than available seats.
2. **Hardcoded Price & User in Backend Controller:** In `backend/src/http-api/controllers/bookings.controller.ts:L15`, `defaultUnitPrice` is hardcoded to `450000` instead of querying the workshop's actual price.
3. **Volatile Backend Memory:** Backend `WorkshopService` and `BookingService` store entities in private class arrays that reset on server reload and start empty.
4. **Static Map vs Dynamic GIS Pins:** `/cultural-map` renders an iframe pointing to fixed coordinates. Filter changes do not reposition or render pins on the map canvas.

---

## 3. Technical Debt Ledger (`shortcut:`)

- `shortcut: mockHttpAdapter in localStorage`: Enabled rapid UI validation for UEH Sandbox Milestone 2 without database hosting cost. Limit: max 5MB browser storage, single-device session.
- `shortcut: simulated RAG copilot in mock-adapter`: Hardcoded semantic keyword dictionary simulates LangChain responses without OpenAI API latency or token cost during pitch demo. Limit: cannot answer arbitrary open-ended questions outside the 6 seed workshops.
- `shortcut: hardcoded user role switcher in navbar`: One-click toggle between Maya (Traveler), Bà Ba (Host), Chú Tư (Host), and Admin QC. Limit: bypasses JWT authentication for pitch convenience.
- `shortcut: unused workshopSlice in Redux`: Components currently manage state locally with `useState`. Redux `workshopSlice` is inactive.
