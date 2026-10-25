from fastapi import APIRouter, HTTPException, Query
from ....schemas.copilot import (
    ChatRequest,
    ChatResponse,
    TranslationRequest,
    TranslationResponse,
    EtiquetteRequest,
    EtiquetteResponse,
)
from ....services.copilot_service import copilot_service
from ....services.translation_service import translation_service
from ....services.rag_service import rag_service

router = APIRouter(prefix="/copilot", tags=["AI Cultural Copilot"])

@router.post("/chat", response_model=ChatResponse, summary="Process bilateral translation & grounded workshop Q&A")
async def chat(request: ChatRequest):
    try:
        return await copilot_service.process_chat(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/translate", response_model=TranslationResponse, summary="Bilingual translation with Vietnamese cultural respect")
async def translate(request: TranslationRequest):
    try:
        result = await translation_service.translate(
            text=request.text,
            source_lang=request.sourceLanguage or "auto",
            target_lang=request.targetLanguage or "auto",
        )
        return TranslationResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/etiquette/{workshop_id}", response_model=EtiquetteResponse, summary="Get verified etiquette, customs and allergens for a workshop")
async def get_etiquette(workshop_id: str):
    sheet = rag_service.get_workshop_sheet(workshop_id)
    if not sheet:
        raise HTTPException(status_code=404, detail="Workshop knowledge sheet not found")
    
    return EtiquetteResponse(
        workshopId=sheet.get("workshopId", workshop_id),
        workshopTitle=sheet.get("title", ""),
        hostName=sheet.get("hostName", ""),
        etiquetteTips=sheet.get("etiquetteTips", []),
        allergens=sheet.get("allergens", []),
        ingredientsOrTools=sheet.get("ingredients", []),
        culturalStory=sheet.get("history", ""),
    )
