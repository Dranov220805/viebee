# 06 — System Integrations & External Services 🔌

## 1. REST API Quick Reference

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/api/workshops` | Public | List all active workshops (`?category=`, `?q=`) |
| `GET` | `/api/workshops/:id` | Public | Get full workshop detail and verified knowledge sheet |
| `POST` | `/api/workshops` | Host/JWT | Create new workshop listing (3-step host tool) |
| `POST` | `/api/bookings` | Traveler/JWT | Create instant RSVP with 12% platform take rate breakdown |
| `GET` | `/api/bookings/my-passes` | Traveler/JWT | Retrieve active QR passes and ticket stubs |
| `POST` | `/api/copilot/query` | Traveler/Host | Submit bilateral question to AI Cultural Copilot |
| `PATCH` | `/api/qc/verify/:id` | Admin/JWT | Approve or revoke community verification badge |

---

## 2. GIS Cultural Map GeoJSON Schema

Each point of interest on the Saigon Cultural Map conforms to the following GeoJSON format:

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [106.6804, 10.7685]
  },
  "properties": {
    "id": "ws-che-buoi",
    "title": "Old-Alley Authentic Chè Bưởi Cooking",
    "hostName": "Bà Ba",
    "category": "culinary",
    "district": "District 3",
    "price": 450000,
    "rating": 4.95,
    "qcVerified": true
  }
}
```

---

## 3. LangChain RAG AI Copilot Pipeline

1. **Document Ingestion:** The host fills out one structured knowledge sheet covering steps, equipment, ingredients, safety rules, and house customs.
2. **Chunking & Indexing:** Text is partitioned into contextual semantic chunks.
3. **Retrieval Gate:** When a traveler asks a question in English, the retrieval engine retrieves top-k relevant chunks from the host's verified knowledge sheet.
4. **Synthesis & Translation:** The LLM synthesizes a polite, natural Vietnamese message for the host and answers the traveler in English with exact etiquette reminders.
