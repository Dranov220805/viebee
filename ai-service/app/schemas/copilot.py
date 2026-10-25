from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class ChatMessage(BaseModel):
    id: str
    workshopId: str
    senderId: str
    senderName: str
    senderRole: str = Field(..., description="TRAVELER, HOST, ADMIN, or AI_COPILOT")
    originalText: str
    originalLanguage: str = "en"
    translatedText: str
    culturalNote: Optional[str] = None
    timestamp: str

class ChatRequest(BaseModel):
    workshopId: str = Field(..., description="Target workshop ID (e.g. ws-che-buoi)")
    message: str = Field(..., description="User message in English or Vietnamese")
    senderRole: Optional[str] = "TRAVELER"
    senderName: Optional[str] = "Maya Jenkins"
    senderId: Optional[str] = "user-maya"

class ChatResponse(BaseModel):
    userMessage: ChatMessage
    aiReply: ChatMessage
    groundedAnswer: str
    etiquetteReminder: Optional[str] = None
    culturalContext: Optional[str] = None
    verified: bool = True

class TranslationRequest(BaseModel):
    text: str
    sourceLanguage: Optional[str] = "auto"
    targetLanguage: Optional[str] = "auto"
    culturalTone: Optional[str] = "polite_southern_vietnamese"

class TranslationResponse(BaseModel):
    originalText: str
    translatedText: str
    sourceLanguage: str
    targetLanguage: str
    culturalNote: Optional[str] = None

class EtiquetteRequest(BaseModel):
    workshopId: str
    topic: Optional[str] = "general"

class EtiquetteResponse(BaseModel):
    workshopId: str
    workshopTitle: str
    hostName: str
    etiquetteTips: List[str]
    allergens: List[str]
    ingredientsOrTools: List[str]
    culturalStory: str
