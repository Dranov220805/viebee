# VieBee AI Cultural Copilot Microservice 🤖

> **Tech Stack:** Python 3.11+ • FastAPI • Pydantic v2 • LangChain RAG Architecture  
> **Role:** Dedicated microservice for model calling, bilateral translation (EN ↔ VI), and grounded cultural etiquette / allergen retrieval.  
> **Affiliation:** UEH University of Economics Ho Chi Minh City • UII Sandbox 2026

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
cd ai-service
pip install -r requirements.txt
```

### 2. Run Locally
```bash
python run.py
# Or:
uvicorn app.main:app --reload --port 8000
```

- **Service URL:** `http://localhost:8000`
- **Interactive OpenAPI Swagger Docs:** `http://localhost:8000/docs`
- **Health Check:** `http://localhost:8000/health`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Service status, current model, and features. |
| `POST` | `/api/v1/copilot/chat` | 4-step bilateral translation + grounded workshop knowledge retrieval. |
| `POST` | `/api/v1/copilot/translate` | Two-way translation with Vietnamese familial respect tone. |
| `GET` | `/api/v1/copilot/etiquette/{workshop_id}` | Grounded house etiquette tips, allergens, and techniques. |

---

## 🛡️ Grounded Knowledge Sheets

The service contains pre-verified knowledge sheets for the 6 seed workshops:
1. `ws-che-buoi`: Southern Chè Bưởi Cooking in Bàn Cờ Alley (Bà Ba).
2. `ws-bamboo-weaving`: Heritage Bamboo & Rattan Basketry (Chú Tư Tre).
3. `ws-nambo-pottery`: Nam Bộ Handcrafted Terracotta Kiln (Nghệ Nhân Năm Gốm).
4. `ws-silk-embroidery`: Bảo Lộc Mulberry Silk Embroidery (Cô Lan Thêu).
5. `ws-lotus-tea`: West Lake Sacred Lotus Tea Scenting (Thầy Minh).
6. `ws-banh-xeo`: Crispy Southern Bánh Xèo & Wild Herb Foraging (Dì Út).
