# 09 — Requirements & UII Sandbox 2026 Traceability Matrix 📋

This matrix connects the implemented codebase directly to the 5 competition milestones and testable hypotheses defined in `documents/Viebee_Document.md`.

## 1. Testable Hypotheses Traceability

| Hypothesis ID | Statement | How Codebase Addresses It | Validation Metric / Pass Criteria |
|---|---|---|---|
| **H1 (Communication Friction)** | $\ge 65\%$ of international travelers cite inability to communicate with hosts and lack of transparent discovery as top deterrents. | Interactive GIS Cultural Map (`/cultural-map`) and AI Cultural Copilot (`/copilot`). | Traveler interview rating $\ge 4/5$. |
| **H2 (AI Translation Efficacy)** | Non-English speaking hosts and travelers can conduct a 90-min workshop with satisfaction $\ge 4.2/5$ without an on-site human interpreter. | Bilateral auto-translation simulator and RAG grounding sheet viewer in `CopilotPage`. | $\ge 80\%$ interactions without human help; satisfaction $\ge 4.2/5.0$. |
| **H3 (Take Rate & Pricing)** | Travelers convert at VND 400,000 – 500,000, and $\ge 80\%$ of hosts accept a 12% platform take rate over Airbnb's ~20%. | Transparent payout calculator in `CreateWorkshopPage` and `WorkshopDetailPage`. | $\ge 7\%$ checkout intent; $\ge 12/15$ hosts accept 12% take rate. |
| **H4 (GTM Hostel QR Stands)** | QR stands across 10 partner hostels in District 1/3 generate $\ge 150$ scanned sessions and $\ge 8$ confirmed bookings. | Quick electronic pass tokens and QR ticket passes in `TravelerBookingsPage`. | $\ge 150$ unique scans; $\ge 8$ confirmed bookings. |

---

## 2. Milestone Alignment

- **Milestone 1 (Market Segmentation & TAM-SAM-SOM):** Implemented SOM goal of 50,000 bookings and 12% commission financial model.
- **Milestone 2 (User Personas & Empathy Map):** Built pre-configured personas for Maya (Traveler), Bà Ba (Elder Host), Chú Tư (Craftsman), and Admin.
- **Milestone 3 (Root Cause Analysis & 5 Whys):** Addressed the lack of accessible low-friction tools and foreign language anxiety for local artisans.
- **Milestone 4 (Product Offerings & Feature-to-Problem Fit):** Delivered the 5 core features (GIS Cultural Map, 3-step listing tool, AI Cultural Copilot, Community QC system, Escrow payouts).
- **Milestone 5 (Value Proposition Canvas & OKRs):** Finalized the roadmap for District 1, 3, 5 beachhead and operational incubation.
