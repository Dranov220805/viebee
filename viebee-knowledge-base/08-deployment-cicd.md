# 08 — Deployment & CI/CD Playbook 🚀

## 1. Frontend Deployment (`viebee/`)

The Next.js frontend is configured for standalone zero-config deployment:
- **Platform:** Vercel, Cloudflare Pages, or Docker container.
- **Node runtime:** Node.js 20+ LTS.
- **Port:** `3000`.

### Build & Run Commands:
```bash
cd viebee
npm install
npm run build
npm run start
```

---

## 2. Backend Deployment (`backend/`)

The NestJS backend runs as a containerized Node service:
- **Port:** `4000`.
- **Database:** PostgreSQL on Supabase or local Docker instance.

### Dockerfile:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --omit=dev
EXPOSE 4000
CMD ["node", "dist/main"]
```
