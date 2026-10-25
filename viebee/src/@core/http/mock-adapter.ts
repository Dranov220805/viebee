import { storageHelper } from "../utils/storage";
import { VIEBEE_STORAGE_KEYS } from "../const";
import {
  WorkshopItem,
  RsvpBooking,
  CopilotChatMessage,
  UserAccount,
  INITIAL_DEMO_USERS,
  INITIAL_WORKSHOPS,
  INITIAL_RSVPS,
  INITIAL_COPILOT_CHATS,
} from "../utils/seed-data";
import { ApiResult } from "./models/ApiResult";

const createSuccessResult = <T>(data: T, message: string = "Thành công"): ApiResult<T> => ({
  status: "success",
  statusCode: 200,
  message,
  error: null,
  systemName: "VIEBEE_HERITAGE_SERVICE",
  data,
});

/**
 * Client-first Local/SessionStorage Mock Adapter.
 * Enables 100% functional, responsive user flows without needing an active backend.
 */
export const mockHttpAdapter = {
  // --- WORKSHOPS ---
  getWorkshops: async (params?: { category?: string; query?: string }): Promise<ApiResult<WorkshopItem[]>> => {
    let workshops = storageHelper.get<WorkshopItem[]>(VIEBEE_STORAGE_KEYS.WORKSHOPS, INITIAL_WORKSHOPS);
    if (!workshops || workshops.length === 0) {
      workshops = INITIAL_WORKSHOPS;
      storageHelper.set(VIEBEE_STORAGE_KEYS.WORKSHOPS, workshops);
    }

    if (params?.category && params.category !== "all") {
      workshops = workshops.filter((w) => w.category === params.category);
    }
    if (params?.query && params.query.trim()) {
      const q = params.query.toLowerCase();
      workshops = workshops.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.titleVi.toLowerCase().includes(q) ||
          w.district.toLowerCase().includes(q) ||
          w.hostName.toLowerCase().includes(q)
      );
    }
    return createSuccessResult(workshops);
  },

  getWorkshopById: async (id: string): Promise<ApiResult<WorkshopItem | null>> => {
    const workshops = storageHelper.get<WorkshopItem[]>(VIEBEE_STORAGE_KEYS.WORKSHOPS, INITIAL_WORKSHOPS);
    const item = workshops.find((w) => w.id === id) || null;
    return createSuccessResult(item);
  },

  createWorkshop: async (workshop: Partial<WorkshopItem>): Promise<ApiResult<WorkshopItem>> => {
    const workshops = storageHelper.get<WorkshopItem[]>(VIEBEE_STORAGE_KEYS.WORKSHOPS, INITIAL_WORKSHOPS);
    const currentUser = storageHelper.get<UserAccount>(VIEBEE_STORAGE_KEYS.CURRENT_USER, INITIAL_DEMO_USERS[1]);

    const newWorkshop: WorkshopItem = {
      id: `ws-${Date.now()}`,
      title: workshop.title || "Traditional Community Workshop",
      titleVi: workshop.titleVi || "Trải Nghiệm Văn Hóa Bản Địa",
      hostId: currentUser.id,
      hostName: currentUser.name,
      hostAvatar: currentUser.avatar,
      hostBio: currentUser.bio,
      category: workshop.category || "culinary",
      district: workshop.district || "District 1 (Quận 1)",
      address: workshop.address || "TP. Hồ Chí Minh",
      latitude: workshop.latitude || 10.7769,
      longitude: workshop.longitude || 106.7009,
      price: workshop.price || 450000,
      durationMinutes: workshop.durationMinutes || 90,
      maxGuests: workshop.maxGuests || 6,
      description: workshop.description || "",
      culturalStory: workshop.culturalStory || "",
      ingredientsOrTools: workshop.ingredientsOrTools || [],
      etiquetteTips: workshop.etiquetteTips || ["Vui lòng tháo giày trước khi vào nhà."],
      images: workshop.images?.length
        ? workshop.images
        : ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80"],
      rating: 5.0,
      reviewCount: 0,
      qcVerified: false, // Requires Admin verification
      slots: workshop.slots || [
        {
          id: `slot-${Date.now()}-1`,
          date: "2026-10-30",
          startTime: "09:30",
          endTime: "11:00",
          capacity: workshop.maxGuests || 6,
          bookedCount: 0,
        },
      ],
      ragKnowledgeDoc: workshop.ragKnowledgeDoc || {
        history: "Preserved through generational family practice in Saigon.",
        techniques: ["Handcrafting methods passed by elder artisans."],
        safetyNotes: "Safe, guided activity.",
        bilingualDictionary: [{ en: "Welcome", vi: "Chào đón", note: "Vietnamese greeting" }],
      },
    };

    workshops.unshift(newWorkshop);
    storageHelper.set(VIEBEE_STORAGE_KEYS.WORKSHOPS, workshops);
    return createSuccessResult(newWorkshop, "Tạo workshop thành công! Đang chờ kiểm duyệt QC.");
  },

  // --- RSVPS / BOOKINGS ---
  createRsvp: async (payload: {
    workshopId: string;
    slotId: string;
    guestsCount: number;
  }): Promise<ApiResult<RsvpBooking>> => {
    const workshops = storageHelper.get<WorkshopItem[]>(VIEBEE_STORAGE_KEYS.WORKSHOPS, INITIAL_WORKSHOPS);
    const rsvps = storageHelper.get<RsvpBooking[]>(VIEBEE_STORAGE_KEYS.RSVPS, INITIAL_RSVPS);
    const currentUser = storageHelper.get<UserAccount>(VIEBEE_STORAGE_KEYS.CURRENT_USER, INITIAL_DEMO_USERS[0]);

    const workshop = workshops.find((w) => w.id === payload.workshopId);
    if (!workshop) {
      throw new Error("Không tìm thấy workshop tương ứng.");
    }

    const slot = workshop.slots.find((s) => s.id === payload.slotId) || workshop.slots[0];
    const totalPrice = workshop.price * payload.guestsCount;
    const platformFee = Math.round(totalPrice * 0.12); // 12% take rate
    const hostPayout = totalPrice - platformFee;        // 88% to host

    const newBooking: RsvpBooking = {
      id: `rsvp-${Date.now()}`,
      workshopId: workshop.id,
      workshopTitle: workshop.title,
      slotId: slot ? slot.id : "default-slot",
      date: slot ? slot.date : "2026-10-25",
      time: slot ? `${slot.startTime} - ${slot.endTime}` : "09:30 - 11:00",
      travelerId: currentUser.id,
      travelerName: currentUser.name,
      travelerEmail: currentUser.email,
      guestsCount: payload.guestsCount,
      totalPrice,
      platformFee,
      hostPayout,
      status: "CONFIRMED",
      qrCodeToken: `VIEBEE-PASS-${Date.now()}-${currentUser.name.slice(0, 3).toUpperCase()}`,
      bookedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      address: workshop.address,
    };

    rsvps.unshift(newBooking);
    storageHelper.set(VIEBEE_STORAGE_KEYS.RSVPS, rsvps);

    // Update bookedCount in workshop slot
    if (slot) {
      slot.bookedCount = (slot.bookedCount || 0) + payload.guestsCount;
      storageHelper.set(VIEBEE_STORAGE_KEYS.WORKSHOPS, workshops);
    }

    return createSuccessResult(newBooking, "Đặt chỗ RSVP thành công! Vé điện tử đã sẵn sàng.");
  },

  getRsvpsForTraveler: async (travelerId: string): Promise<ApiResult<RsvpBooking[]>> => {
    const rsvps = storageHelper.get<RsvpBooking[]>(VIEBEE_STORAGE_KEYS.RSVPS, INITIAL_RSVPS);
    const filtered = rsvps.filter((r) => r.travelerId === travelerId);
    return createSuccessResult(filtered);
  },

  getRsvpsForHost: async (hostId: string): Promise<ApiResult<RsvpBooking[]>> => {
    const workshops = storageHelper.get<WorkshopItem[]>(VIEBEE_STORAGE_KEYS.WORKSHOPS, INITIAL_WORKSHOPS);
    const hostWorkshopIds = workshops.filter((w) => w.hostId === hostId).map((w) => w.id);
    const rsvps = storageHelper.get<RsvpBooking[]>(VIEBEE_STORAGE_KEYS.RSVPS, INITIAL_RSVPS);
    const filtered = rsvps.filter((r) => hostWorkshopIds.includes(r.workshopId));
    return createSuccessResult(filtered);
  },

  // --- AI CULTURAL COPILOT ---
  getChatMessages: async (workshopId: string): Promise<ApiResult<CopilotChatMessage[]>> => {
    const chats = storageHelper.get<CopilotChatMessage[]>(VIEBEE_STORAGE_KEYS.COPILOT_CHATS, INITIAL_COPILOT_CHATS);
    const filtered = chats.filter((c) => c.workshopId === workshopId);
    return createSuccessResult(filtered.length ? filtered : INITIAL_COPILOT_CHATS);
  },

  sendCopilotMessage: async (payload: {
    workshopId: string;
    text: string;
  }): Promise<ApiResult<{ userMessage: CopilotChatMessage; aiReply?: CopilotChatMessage }>> => {
    const chats = storageHelper.get<CopilotChatMessage[]>(VIEBEE_STORAGE_KEYS.COPILOT_CHATS, INITIAL_COPILOT_CHATS);
    const currentUser = storageHelper.get<UserAccount>(VIEBEE_STORAGE_KEYS.CURRENT_USER, INITIAL_DEMO_USERS[0]);
    const workshops = storageHelper.get<WorkshopItem[]>(VIEBEE_STORAGE_KEYS.WORKSHOPS, INITIAL_WORKSHOPS);
    const workshop = workshops.find((w) => w.id === payload.workshopId) || workshops[0];

    const isEnglish = /^[a-zA-Z0-9\s.,!?'"()-]+$/.test(payload.text);
    const originalLanguage = isEnglish ? "en" : "vi";

    // Two-way translation simulation
    let translated = "";
    if (isEnglish) {
      translated = `[VieBee AI Dịch]: "${payload.text}" → Đã chuyển ngữ sang tiếng Việt thân mật cho Host.`;
    } else {
      translated = `[VieBee AI Translated]: "${payload.text}" → Translated to natural English for guest.`;
    }

    const userMessage: CopilotChatMessage = {
      id: `chat-${Date.now()}-1`,
      workshopId: payload.workshopId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      originalText: payload.text,
      originalLanguage,
      translatedText: translated,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    chats.push(userMessage);

    // Simulated Grounded RAG Copilot Advice
    let aiReplyText = "";
    const qLower = payload.text.toLowerCase();

    if (qLower.includes("etiquette") || qLower.includes("shoes") || qLower.includes("greet") || qLower.includes("chào")) {
      aiReplyText = `Grounded Etiquette Guide: ${workshop.etiquetteTips.join(" ")}`;
    } else if (qLower.includes("ingredient") || qLower.includes("allergy") || qLower.includes("nut") || qLower.includes("nguyên liệu")) {
      aiReplyText = `Grounded Ingredients Check: This workshop uses: ${workshop.ingredientsOrTools.join(", ")}. Host can customize upon advance notice.`;
    } else if (qLower.includes("address") || qLower.includes("where") || qLower.includes("ở đâu") || qLower.includes("địa chỉ")) {
      aiReplyText = `Verified Location: ${workshop.address}. Look for the VieBee heritage lantern at the alley entrance!`;
    } else {
      aiReplyText = `VieBee Copilot is bridging communication with Host ${workshop.hostName}. All instructions are grounded in the verified workshop sheet.`;
    }

    const aiReply: CopilotChatMessage = {
      id: `chat-${Date.now()}-2`,
      workshopId: payload.workshopId,
      senderId: "ai-copilot",
      senderName: "VieBee Cultural Copilot",
      senderRole: "AI_COPILOT",
      originalText: aiReplyText,
      originalLanguage: "en",
      translatedText: `[Bản dịch AI]: ${aiReplyText}`,
      culturalNote: "Answer grounded strictly in verified host knowledge document.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    chats.push(aiReply);
    storageHelper.set(VIEBEE_STORAGE_KEYS.COPILOT_CHATS, chats);

    return createSuccessResult({ userMessage, aiReply });
  },

  // --- AUTH & DEMO USER SWITCHER ---
  getCurrentUser: async (): Promise<ApiResult<UserAccount>> => {
    let user = storageHelper.get<UserAccount>(VIEBEE_STORAGE_KEYS.CURRENT_USER, INITIAL_DEMO_USERS[0]);
    if (!user) {
      user = INITIAL_DEMO_USERS[0];
      storageHelper.set(VIEBEE_STORAGE_KEYS.CURRENT_USER, user);
    }
    return createSuccessResult(user);
  },

  switchDemoUser: async (userId: string): Promise<ApiResult<UserAccount>> => {
    const target = INITIAL_DEMO_USERS.find((u) => u.id === userId) || INITIAL_DEMO_USERS[0];
    storageHelper.set(VIEBEE_STORAGE_KEYS.CURRENT_USER, target);
    return createSuccessResult(target, `Đã chuyển sang tài khoản: ${target.name} (${target.role})`);
  },

  // --- ADMIN QC VERIFICATION ---
  verifyWorkshop: async (workshopId: string, isApproved: boolean): Promise<ApiResult<WorkshopItem | null>> => {
    const workshops = storageHelper.get<WorkshopItem[]>(VIEBEE_STORAGE_KEYS.WORKSHOPS, INITIAL_WORKSHOPS);
    const item = workshops.find((w) => w.id === workshopId);
    if (item) {
      item.qcVerified = isApproved;
      storageHelper.set(VIEBEE_STORAGE_KEYS.WORKSHOPS, workshops);
    }
    return createSuccessResult(item || null, isApproved ? "Đã duyệt và cấp huy hiệu QC!" : "Đã từ chối kiểm duyệt.");
  },
};
