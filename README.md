# VieBee — Mapping Living Heritage, Empowering Communities 🐝

> **Incubation:** UEH University of Economics Ho Chi Minh City • UII Sandbox 2026  
> **Theme:** "Empowering Glocal Citizens — Co-creating Innovation for a Sustainable Future"  
> **Beachhead Destination:** Ho Chi Minh City (Districts 1, 3, 5, Bình Thạnh)  
> **Source Specification:** [`documents/Viebee_Document.md`](documents/Viebee_Document.md)

---

## 📁 Project Repository Structure

This repository is modeled faithfully after the template architecture (`template/`), utilizing a **Next.js 16 (React 19)** frontend with **client-first Local/SessionStorage persistence** and a modular **NestJS 11 Clean Architecture** backend ready for deployment:

```
src/
├── viebee/                     # Next.js 16 + React 19 Frontend Application
│   ├── src/
│   │   ├── @core/              # Shared infrastructure (HTTP, constants, storage, components)
│   │   │   ├── component/      # Reusable AntD components & trust verification badges
│   │   │   ├── const/          # Routes, storage keys, categories, HCMC districts
│   │   │   ├── http/           # Axios HTTP client + Autonomous LocalStorage Mock Adapter
│   │   │   ├── provider/       # Redux, Ant Design Theme, Sidebar, Notification providers
│   │   │   └── utils/          # Storage helpers, VND currency formatters, seed data
│   │   ├── app/                # Next.js App Router (11 fully responsive routes)
│   │   │   ├── page.tsx        # Living Heritage Landing Page
│   │   │   ├── cultural-map/   # Dynamic GIS Cultural Map with HCMC coordinates
│   │   │   ├── workshops/      # Micro-Workshop Marketplace directory
│   │   │   ├── workshops/[id]/ # Workshop Detail & Instant RSVP Modal (12% take rate)
│   │   │   ├── copilot/        # AI Cultural Copilot Live Console (LangChain RAG)
│   │   │   ├── host/           # Host Portal (3-step listing tool & dashboard)
│   │   │   ├── traveler/       # Traveler Portal (Electronic Passes with QR tokens)
│   │   │   ├── admin/          # QC Verification & Moderation Center
│   │   │   └── signin/         # 1-Click Sandbox Persona Switcher (Maya, Bà Ba, Admin)
│   │   ├── layouts/            # MainHeader, MainFooter, Navigation
│   │   ├── services/           # Service layer (workshop, rsvp, copilot, auth, qc)
│   │   ├── stores/             # Redux Toolkit store (authSlice, workshopSlice)
│   │   └── themes/             # Ant Design v6 theme tokens (Honey Gold, Terracotta, Indigo)
│   └── public/                 # Static assets, CSS stylesheets, images
│
├── backend/                    # NestJS 11 Main Backend Service (Clean Architecture)
│   ├── src/
│   │   ├── VB.VieBeeService.Domain/              # Pure domain entities, repository interfaces
│   │   ├── VB.VieBeeService.Domain.Shared/       # Cross-cutting enums, ErrorCode, BusinessException
│   │   ├── VB.VieBeeService.Application.Contracts/ # Input/Output DTOs with explicit Swagger decorators
│   │   ├── VB.VieBeeService.Application/         # Workshop, Booking, Copilot (AI proxy), QC services
│   │   ├── VB.VieBeeService.Infrastructure/      # In-memory repositories (6 seed workshops), Prisma
│   │   └── VB.VieBeeService.HttpApi/             # REST Controllers, TransformResponseInterceptor, Filters
│   └── prisma/schema.prisma    # Complete relational database model
│
├── ai-service/                 # Python 3.11 + FastAPI AI Cultural Copilot Microservice
│   ├── app/
│   │   ├── api/v1/endpoints/   # /copilot/chat, /copilot/translate, /copilot/etiquette
│   │   ├── services/           # LangChain RAG pipeline, bilateral translation service
│   │   ├── schemas/            # Pydantic v2 validation models
│   │   └── data/               # Verified knowledge sheets for the 6 heritage workshops
│   ├── requirements.txt        # FastAPI, Uvicorn, Pydantic, Httpx dependencies
│   └── run.py                  # Standalone launcher on port 8000
│
├── viebee-knowledge-base/      # Comprehensive AI Engineering Knowledge Base (10 documents)
│   ├── README.md               # Master index & system topology
│   ├── 00-glossary.md          # Bilingual Vietnamese & English cultural/technical terms
│   ├── 01-architecture.md      # Dual-stack topology & localStorage mock bridge
│   ├── 02-tech-stack.md        # Pinned dependency matrix
│   ├── 03-conventions.md       # Response envelopes & storage keys
│   ├── 04-business-domain.md   # Entities, relationships & 12% fee rules
│   ├── 05-flows.md             # Sequence diagrams (RSVP, 3-step listing, 4-step Copilot chain)
│   ├── 06-integrations.md      # REST endpoints & GeoJSON mapping schema
│   ├── 07-security-permissions.md # Role-Based Access Control (`TRAVELER`, `HOST`, `ADMIN`)
│   ├── 08-deployment-cicd.md   # Docker & Vercel deployment playbooks
│   └── 09-requirements/        # Traceability matrix to Milestones 1–5 and Hypotheses H1–H4
│
├── documents/                  # Competition proposal, research & OKR documentation
│   └── Viebee_Document.md      # Full UII Sandbox 2026 project document
└── template/                   # Reference architecture template
```

---

## ⚡ Quick Start: Running the Frontend

The frontend is **100% functional right now** with client-first `localStorage` / `sessionStorage` persistence — no backend server or database setup required.

```bash
# 1. Navigate to frontend directory
cd viebee

# 2. Run development server
npm run dev
```

Open your browser at **[http://localhost:3000](http://localhost:3000)**:
- **Living Heritage Landing Page:** [http://localhost:3000/](http://localhost:3000/)
- **GIS Cultural Map:** [http://localhost:3000/cultural-map/](http://localhost:3000/cultural-map/)
- **Micro-Workshops Directory:** [http://localhost:3000/workshops/](http://localhost:3000/workshops/)
- **AI Cultural Copilot (Live Chat):** [http://localhost:3000/copilot/](http://localhost:3000/copilot/)
- **Host 3-Step Listing Flow:** [http://localhost:3000/host/create-workshop/](http://localhost:3000/host/create-workshop/)
- **Host Dashboard & 88% Payouts:** [http://localhost:3000/host/dashboard/](http://localhost:3000/host/dashboard/)
- **Traveler QR Ticket Passes:** [http://localhost:3000/traveler/bookings/](http://localhost:3000/traveler/bookings/)
- **Admin QC Verification:** [http://localhost:3000/admin/verification/](http://localhost:3000/admin/verification/)

---

## 🎭 1-Click Prototype Persona Switcher

Use the switcher in the header or at `/signin` to test different perspectives:
1. **🎒 Maya (Traveler):** Explores the GIS map, inspects the Chè Bưởi workshop, reserves an RSVP with transparent 12% platform fee calculation, and views her QR code boarding pass.
2. **👵 Bà Ba (Host):** Manages RSVPs, views her direct 88% net earnings (deposited to Vietcombank), lists new workshops in 3 taps, and reviews bilingual chat translations.
3. **🛡️ QC Admin:** Inspects submitted workshops, verifies host identity and home safety, and awards the green "Community QC Verified" badge.
