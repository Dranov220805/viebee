import json
import os
import re
from pathlib import Path
from typing import Dict, Any, Optional, List
from ..config import settings

class RagService:
    def __init__(self):
        self.data_path = Path(__file__).parent.parent / "data" / "knowledge_sheets.json"
        self.knowledge_sheets: Dict[str, Any] = self._load_knowledge_sheets()

    def _load_knowledge_sheets(self) -> Dict[str, Any]:
        if self.data_path.exists():
            try:
                with open(self.data_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception as e:
                print(f"[RAG Service] Error loading knowledge sheets: {e}")
        return {}

    def get_workshop_sheet(self, workshop_id: str) -> Optional[Dict[str, Any]]:
        return self.knowledge_sheets.get(workshop_id) or self.knowledge_sheets.get("ws-che-buoi")

    async def query_knowledge(self, workshop_id: str, query: str) -> Dict[str, Any]:
        sheet = self.get_workshop_sheet(workshop_id)
        if not sheet:
            return {
                "answer": "Không tìm thấy thông tin chi tiết về workshop này.",
                "etiquette": "Vui lòng tôn trọng gia chủ và hỏi trước khi chụp ảnh.",
                "verified": False,
            }

        q_lower = query.lower()

        # Check for remote LLM calling if API key is provided
        if settings.OPENAI_API_KEY:
            try:
                import httpx
                system_prompt = f"""You are the VieBee AI Cultural Copilot for an experiential living heritage platform in Saigon.
You are assisting a traveler and a local artisan conducting a workshop: {sheet.get('title')}.
Host: {sheet.get('hostName')} at {sheet.get('address')}.
History & Lore: {sheet.get('history')}
Techniques: {', '.join(sheet.get('techniques', []))}
Ingredients / Tools: {', '.join(sheet.get('ingredients', []))}
Allergens: {', '.join(sheet.get('allergens', []))}
House Rules & Etiquette: {', '.join(sheet.get('etiquetteTips', []))}

Rule: Answer accurately and warmly. Ground your answers strictly in the verified workshop facts above.
Always provide a concise, respectful response in English, and highlight relevant etiquette if asked."""

                async with httpx.AsyncClient(timeout=15.0) as client:
                    resp = await client.post(
                        "https://api.openai.com/v1/chat/completions",
                        headers={"Authorization": f"Bearer {settings.OPENAI_API_KEY}"},
                        json={
                            "model": settings.AI_MODEL,
                            "messages": [
                                {"role": "system", "content": system_prompt},
                                {"role": "user", "content": query},
                            ],
                            "temperature": 0.3,
                        },
                    )
                    if resp.status_code == 200:
                        res_json = resp.json()
                        answer = res_json["choices"][0]["message"]["content"].strip()
                        return {
                            "answer": answer,
                            "etiquette": sheet.get("etiquetteTips", ["Vui lòng tháo giày trước khi vào nhà."])[0],
                            "verified": True,
                        }
            except Exception as e:
                print(f"[RAG Service] Remote LLM query failed, using grounded local knowledge: {e}")

        # Grounded semantic matching against host verified sheet
        allergens = sheet.get("allergens", [])
        ingredients = sheet.get("ingredients", [])
        etiquette = sheet.get("etiquetteTips", [])
        techniques = sheet.get("techniques", [])

        # 1. Allergies & Ingredients check
        if any(w in q_lower for w in ["nut", "peanut", "allergy", "allergic", "dị ứng", "đậu phộng", "ingredient", "nguyên liệu", "dairy", "seafood", "shrimp"]):
            allergen_text = f"Allergen notice: {'; '.join(allergens)}." if allergens else "No common nut/dairy allergens reported."
            return {
                "answer": f"Grounded Ingredients Check: This workshop uses {', '.join(ingredients[:4])}. {allergen_text} The host can customize or omit garnishes upon advance notice.",
                "etiquette": "Please let the host know about any dietary restrictions as soon as you arrive.",
                "verified": True,
            }

        # 2. Etiquette, shoes, greeting, customs
        if any(w in q_lower for w in ["shoe", "shoes", "wear", "dress", "etiquette", "greet", "greeting", "chào", "giày", "lịch sự", "tập quán"]):
            return {
                "answer": f"House Customs & Etiquette: {' '.join(etiquette)}",
                "etiquette": etiquette[0] if etiquette else "Please remove shoes before stepping into the living quarters.",
                "verified": True,
            }

        # 3. Location, address, alley entrance
        if any(w in q_lower for w in ["where", "address", "location", "alley", "hẻm", "địa chỉ", "ở đâu"]):
            return {
                "answer": f"Verified Location: {sheet.get('address')}. Look for the traditional VieBee heritage lantern at the alley entrance in {sheet.get('district')}.",
                "etiquette": "If you have trouble finding the alley entrance, the host family will gladly meet you at the alley mouth.",
                "verified": True,
            }

        # 4. Craft technique & takeaway
        if any(w in q_lower for w in ["take home", "takeaway", "make", "technique", "kỹ thuật", "làm", "mang về"]):
            return {
                "answer": f"Technique Guide: {techniques[0] if techniques else 'Hands-on practice under master artisan guidance.'} Guests can take home their handcrafted creations or fresh portions.",
                "etiquette": "Please take your time and follow the artisan's demonstration closely.",
                "verified": True,
            }

        # 5. Default grounded overview
        return {
            "answer": f"VieBee Cultural Copilot for {sheet.get('title')}: Hosted by {sheet.get('hostName')}. {sheet.get('history')} Verified house tips: {etiquette[0] if etiquette else 'Warm tea served on arrival.'}",
            "etiquette": etiquette[0] if etiquette else "Greet the host with two hands clasped slightly as a mark of respect.",
            "verified": True,
        }

rag_service = RagService()
