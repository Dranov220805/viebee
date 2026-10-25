# VieBee — AI Knowledge Base & Engineering Specification 🐝

> **Project:** VieBee — Mapping Living Heritage, Empowering Communities  
> **Affiliation:** UEH University of Economics Ho Chi Minh City • UII Sandbox 2026  
> **Target Beachhead:** Ho Chi Minh City (Districts 1, 3, 5, Bình Thạnh)  
> **Source of Truth:** `documents/Viebee_Document.md`, `viebee/` (Next.js Frontend), `backend/` (NestJS Backend)

---

## 🧭 Master Knowledge Base Index

| Document | Purpose & Scope |
|---|---|
| [00-glossary.md](00-glossary.md) | Bilingual Vietnamese / English terms (Living Heritage, Micro-workshop, RAG Copilot, QC Escrow) |
| [01-architecture.md](01-architecture.md) | Dual-stack topology: Next.js Frontend (LocalStorage Mock bridge) + NestJS Clean Architecture |
| [02-tech-stack.md](02-tech-stack.md) | Pinned dependency versions, rationale for Next.js 16, Ant Design v6, Tailwind v4, NestJS 11 |
| [03-conventions.md](03-conventions.md) | Coding conventions, storage keys, standardized API envelopes (`ApiResult<T>`) |
| [04-business-domain.md](04-business-domain.md) | Domain entities (`User`, `Workshop`, `WorkshopSlot`, `Booking`, `CopilotMessage`), 12% fee rules |
| [05-flows.md](05-flows.md) | End-to-end user journeys (Traveler RSVP, 3-Step Host Listing, AI Copilot Translation & Grounding) |
| [06-integrations.md](06-integrations.md) | REST API endpoints, GIS Cultural Map GeoJSON schema, LangChain RAG pipeline |
| [07-security-permissions.md](07-security-permissions.md) | Role-Based Access Control (`TRAVELER`, `HOST`, `ADMIN`), host residential privacy, verification gates |
| [08-deployment-cicd.md](08-deployment-cicd.md) | Vercel frontend, Railway / Docker backend, and local storage offline mode |
| [09-requirements/README.md](09-requirements/README.md) | UII Sandbox 2026 Milestones 1–5 traceability, OKRs, and hypotheses H1–H4 validation gates |
| [10-current-source-status.md](10-current-source-status.md) | Audit report, component readiness matrix (70–95%), logic gaps, and technical debt ledger |

---

## 🌟 Executive Summary & Core Value Proposition

**VieBee** is a peer-to-peer experiential travel marketplace that connects independent international travelers directly with grassroots Vietnamese local hosts (artisans, home cooks, and craftspeople).

### Three Strategic Pillars:
1. **Living Heritage Marketplace:** Replaces generic tourist traps and industrial mega-tours with intimate, hands-on micro-workshops (cooking traditional *chè*, bamboo weaving, Nam Bộ pottery, silk embroidery).
2. **GIS Cultural Map:** Answers *"What living heritage is around me right now?"* through location-aware alleyway discovery across Saigon's historic neighborhoods.
3. **AI Cultural Copilot (LangChain + RAG):** Real-time bilateral translation (traveler English ↔ host Vietnamese) strictly grounded in verified workshop sheets to eliminate communication and cultural etiquette anxiety without hiring an expensive bilingual guide.
4. **Community Economic Justice:** Low **12% platform take rate** (compared to Airbnb's ~20% fee), ensuring **88% of tourism spending flows directly into the pockets of local households**.
