import time
from datetime import datetime
from ..schemas.copilot import ChatRequest, ChatResponse, ChatMessage
from .rag_service import rag_service
from .translation_service import translation_service

class CopilotService:
    async def process_chat(self, req: ChatRequest) -> ChatResponse:
        now_str = datetime.now().strftime("%H:%M")
        src_lang = translation_service.detect_language(req.message)

        # 1. Translate user message for recipient
        trans_result = await translation_service.translate(req.message, source_lang=src_lang)

        user_msg = ChatMessage(
            id=f"chat-{int(time.time() * 1000)}-user",
            workshopId=req.workshopId,
            senderId=req.senderId or "user-maya",
            senderName=req.senderName or "Maya Jenkins",
            senderRole=req.senderRole or "TRAVELER",
            originalText=req.message,
            originalLanguage=src_lang,
            translatedText=trans_result["translatedText"],
            culturalNote=trans_result.get("culturalNote"),
            timestamp=now_str,
        )

        # 2. Query verified workshop knowledge sheet
        rag_result = await rag_service.query_knowledge(req.workshopId, req.message)

        # 3. Formulate Copilot AI Assistant message
        ai_reply_text = rag_result["answer"]
        ai_trans = await translation_service.translate(ai_reply_text, source_lang="en", target_lang="vi")

        ai_msg = ChatMessage(
            id=f"chat-{int(time.time() * 1000)}-ai",
            workshopId=req.workshopId,
            senderId="ai-copilot",
            senderName="VieBee Cultural Copilot",
            senderRole="AI_COPILOT",
            originalText=ai_reply_text,
            originalLanguage="en",
            translatedText=ai_trans["translatedText"],
            culturalNote=rag_result.get("etiquette"),
            timestamp=now_str,
        )

        return ChatResponse(
            userMessage=user_msg,
            aiReply=ai_msg,
            groundedAnswer=rag_result["answer"],
            etiquetteReminder=rag_result.get("etiquette"),
            culturalContext=f"Grounded strictly in verified knowledge sheet for {req.workshopId}",
            verified=rag_result.get("verified", True),
        )

copilot_service = CopilotService()
