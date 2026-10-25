import { VIEBEE_STORAGE_KEYS } from "../const";
import { storageHelper } from "./storage";

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: "TRAVELER" | "HOST" | "ADMIN";
  avatar: string;
  bio: string;
  phone?: string;
  isVerified?: boolean;
}

export interface WorkshopSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  bookedCount: number;
}

export interface WorkshopItem {
  id: string;
  title: string;
  titleVi: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  hostBio: string;
  category: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  price: number;
  durationMinutes: number;
  maxGuests: number;
  description: string;
  culturalStory: string;
  ingredientsOrTools: string[];
  etiquetteTips: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  qcVerified: boolean;
  slots: WorkshopSlot[];
  ragKnowledgeDoc: {
    history: string;
    techniques: string[];
    safetyNotes: string;
    bilingualDictionary: { en: string; vi: string; note: string }[];
  };
}

export interface RsvpBooking {
  id: string;
  workshopId: string;
  workshopTitle: string;
  slotId: string;
  date: string;
  time: string;
  travelerId: string;
  travelerName: string;
  travelerEmail: string;
  guestsCount: number;
  totalPrice: number;
  platformFee: number;
  hostPayout: number;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  qrCodeToken: string;
  bookedAt: string;
  address: string;
}

export interface CopilotChatMessage {
  id: string;
  workshopId: string;
  senderId: string;
  senderName: string;
  senderRole: "TRAVELER" | "HOST" | "ADMIN" | "AI_COPILOT";
  originalText: string;
  originalLanguage: "en" | "vi";
  translatedText: string;
  culturalNote?: string;
  timestamp: string;
}

export const INITIAL_DEMO_USERS: UserAccount[] = [
  {
    id: "user-maya",
    name: "Maya Jenkins",
    email: "maya.traveler@example.com",
    role: "TRAVELER",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Independent cultural explorer from Melbourne. Passionate about authentic grassroots cooking and heritage crafts.",
    phone: "+61 400 123 456",
    isVerified: true,
  },
  {
    id: "user-baba",
    name: "Bà Ba (Nguyễn Thị Mai)",
    email: "baba.che@viebee.vn",
    role: "HOST",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    bio: "3rd-generation Southern dessert cook in Bàn Cờ alley. Preserving traditional pomelo blossom and mung bean recipes for over 45 years.",
    phone: "+84 903 888 123",
    isVerified: true,
  },
  {
    id: "user-chutu",
    name: "Chú Tư Tre (Trần Văn Tư)",
    email: "chutu.bamboo@viebee.vn",
    role: "HOST",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Master artisan of bamboo and rattan basketry from Thanh Đa riverside. Sharing generational weaving techniques.",
    phone: "+84 912 333 456",
    isVerified: true,
  },
  {
    id: "user-admin",
    name: "VieBee QC & Community Team",
    email: "qc@viebee.vn",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    bio: "UEH UII Sandbox 2026 incubation team overseeing community verification, on-site host QC, and content moderation.",
    phone: "+84 28 3829 5601",
    isVerified: true,
  },
];

export const INITIAL_WORKSHOPS: WorkshopItem[] = [
  {
    id: "ws-che-buoi",
    title: "Old-Alley Authentic Chè Bưởi & Pomelo Blossom Cooking",
    titleVi: "Nấu Chè Bưởi Cổ Truyền Hương Hoa Bưởi Tại Con Hẻm Bàn Cờ",
    hostId: "user-baba",
    hostName: "Bà Ba (Nguyễn Thị Mai)",
    hostAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    hostBio: "Elder home cook with 45 years crafting traditional desserts in District 3.",
    category: "culinary",
    district: "District 3 (Quận 3 - Bàn Cờ)",
    address: "Hẻm 242/18 Nguyễn Thiện Thuật, Phường 3, Quận 3, TP. Hồ Chí Minh",
    latitude: 10.7685,
    longitude: 106.6804,
    price: 450000,
    durationMinutes: 90,
    maxGuests: 6,
    description: "Step into an authentic open-air courtyard kitchen inside District 3's iconic Ban Co labyrinth. You will hand-prep pomelo pith (loại bỏ vị đắng), roast golden mung beans, cook silken tapioca pearls, and finish with pure pomelo blossom water and rich warm coconut milk.",
    culturalStory: "Chè Bưởi is a testament to Vietnamese culinary ingenuity — turning what would be discarded citrus rind into translucent, crunchy pearls steeped in fragrant blossoms. Bà Ba learned this recipe from her grandmother during the late 1960s.",
    ingredientsOrTools: [
      "Fresh Năm Roi Pomelo Pith",
      "Hạt đậu xanh xát vỏ rang thơm",
      "Pure organic tapioca starch (Bột năng nguyên chất)",
      "Nước hoa bưởi chưng cất truyền thống",
      "Fresh coconut cream & crushed toasted peanuts",
    ],
    etiquetteTips: [
      "Please remove shoes before stepping into the family living quarters.",
      "Greet the host with two hands clasped slightly as a mark of respect ('Dạ con chào Bà').",
      "Tea is served first before starting the kitchen hearth.",
    ],
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&auto=format&fit=crop&q=80",
    ],
    rating: 4.95,
    reviewCount: 38,
    qcVerified: true,
    slots: [
      { id: "slot-cb-1", date: "2026-10-24", startTime: "09:30", endTime: "11:00", capacity: 6, bookedCount: 3 },
      { id: "slot-cb-2", date: "2026-10-24", startTime: "14:30", endTime: "16:00", capacity: 6, bookedCount: 1 },
      { id: "slot-cb-3", date: "2026-10-25", startTime: "09:30", endTime: "11:00", capacity: 6, bookedCount: 0 },
    ],
    ragKnowledgeDoc: {
      history: "Southern Chè Bưởi originated as a seasonal delicacy during harvest festivals in the Mekong Delta and Saigon.",
      techniques: [
        "Brining and massaging the white pomelo albedo with sea salt to extract bitterness.",
        "Soaking in warm alum water and coating thoroughly with tapioca starch before rapid boiling.",
        "Folding slow-simmered split mung beans without mashing their tender texture.",
      ],
      safetyNotes: "Gentle heat used on gas stove; host provides aprons and heat-resistant silicone spatulas.",
      bilingualDictionary: [
        { en: "Pomelo rind/pith", vi: "Cùi bưởi", note: "The spongy white inner layer of citrus peel" },
        { en: "Mung beans", vi: "Đậu xanh", note: "Peeled and steamed to soft nutty tenderness" },
        { en: "Tapioca flour", vi: "Bột năng", note: "Creates the glossy, translucent jelly coating" },
        { en: "Pomelo flower extract", vi: "Nước hoa bưởi", note: "Aromatic floral water added right at the end" },
      ],
    },
  },
  {
    id: "ws-bamboo-weaving",
    title: "Living Heritage Bamboo Weaving & Coaster Crafting",
    titleVi: "Nghệ Thuật Đan Lát Mây Tre Thủ Công & Chuyện Nghề Sông Nước",
    hostId: "user-chutu",
    hostName: "Chú Tư Tre (Trần Văn Tư)",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    hostBio: "Master craftsman weaving bamboo for over 35 years.",
    category: "bamboo-weaving",
    district: "Bình Thạnh (Thanh Đa)",
    address: "88/4 Bình Quới, Cư xá Thanh Đa, Bình Thạnh, TP. Hồ Chí Minh",
    latitude: 10.8142,
    longitude: 106.7289,
    price: 420000,
    durationMinutes: 120,
    maxGuests: 5,
    description: "Sit on woven mats shaded by palm trees along the Saigon River canal. Learn to shave, bend, and weave supple bamboo strips into your own custom tea coaster or tabletop basket to take home.",
    culturalStory: "Bamboo is Vietnam's spiritual tree — resilient, pliable, and communal. Chú Tư preserves rural craft traditions brought to Saigon by migrant artisans in the mid-20th century.",
    ingredientsOrTools: [
      "Natural smoked Vietnamese bamboo strips (Nan tre ngâm dẻo)",
      "Traditional bone scrapers & shaping knives (Dao chuốt)",
      "Natural beeswax polish & organic hemp thread",
    ],
    etiquetteTips: [
      "Watch the artisan's hand positions closely before applying force.",
      "Never step over raw bamboo strips laid on the craft mat.",
    ],
    images: [
      "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&auto=format&fit=crop&q=80",
    ],
    rating: 4.88,
    reviewCount: 24,
    qcVerified: true,
    slots: [
      { id: "slot-bw-1", date: "2026-10-24", startTime: "15:00", endTime: "17:00", capacity: 5, bookedCount: 2 },
      { id: "slot-bw-2", date: "2026-10-26", startTime: "10:00", endTime: "12:00", capacity: 5, bookedCount: 0 },
    ],
    ragKnowledgeDoc: {
      history: "Vietnamese bamboo weaving dates back over 1,000 years, essential for river transport, fishing nets, and domestic life.",
      techniques: [
        "Splitting bamboo poles along natural grain lines into razor-thin ribbons.",
        "Over-under basket weave patterns (Đan nong mốt, nong hai).",
      ],
      safetyNotes: "Artisan guides blade handling; cut-resistant craft gloves provided.",
      bilingualDictionary: [
        { en: "Bamboo strip", vi: "Nan tre", note: "Flexible soaked bamboo ribbon" },
        { en: "Intertwine / Weave", vi: "Đan cài", note: "Alternating weft and warp strips" },
      ],
    },
  },
  {
    id: "ws-pottery-cholon",
    title: "Chợ Lớn Clay Teacup Wheel Throwing & Local Glazing",
    titleVi: "Chuốt Gốm Đất Sét Chợ Lớn & Nghệ Thuật Tráng Men Cổ",
    hostId: "user-admin",
    hostName: "Nghệ nhân Kaka Lê",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    hostBio: "Ceramic designer reconnecting urban youth with Nam Bộ kiln heritage.",
    category: "ceramics",
    district: "District 5 (Quận 5 - Chợ Lớn)",
    address: "42 Triệu Quang Phục, Phường 10, Quận 5, TP. Hồ Chí Minh",
    latitude: 10.7538,
    longitude: 106.6611,
    price: 480000,
    durationMinutes: 90,
    maxGuests: 4,
    description: "Discover a secret pottery studio nestled inside a historic 1920s shophouse in Chinatown. Shape your own handmade tea bowl on a kickwheel using iron-rich Southern clay.",
    culturalStory: "Chợ Lớn was once home to the renowned Cây Mai pottery kilns, producing the iconic blue-green glazed rooftop ceramics seen on ancient pagodas across Saigon.",
    ingredientsOrTools: [
      "Natural Southern red clay (Đất sét mộc)",
      "Traditional wooden kickwheel & sponge tools",
      "Celadon & copper green glaze washes",
    ],
    etiquetteTips: [
      "Dress in comfortable clothes that can tolerate light clay splash.",
      "Tie long hair back before using spinning wheels.",
    ],
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80",
    ],
    rating: 4.92,
    reviewCount: 31,
    qcVerified: true,
    slots: [
      { id: "slot-pot-1", date: "2026-10-25", startTime: "14:00", endTime: "15:30", capacity: 4, bookedCount: 1 },
      { id: "slot-pot-2", date: "2026-10-27", startTime: "10:00", endTime: "11:30", capacity: 4, bookedCount: 0 },
    ],
    ragKnowledgeDoc: {
      history: "Cây Mai ceramics formed the architectural decorative backbone of Cho Lon's temples throughout the 19th and early 20th centuries.",
      techniques: [
        "Centering the clay ball on the wheel with steady palm pressure.",
        "Opening the cylinder core and pulling walls uniformly.",
      ],
      safetyNotes: "Non-toxic organic clay; kiln firing performed by studio master after natural air-drying.",
      bilingualDictionary: [
        { en: "Pottery wheel", vi: "Bàn xoay gốm", note: "Rotating craft wheel" },
        { en: "Glaze", vi: "Men gốm", note: "Mineral coating that vitrifies in kiln" },
      ],
    },
  },
  {
    id: "ws-herbal-tea",
    title: "Chinatown Traditional Apothecary Walk & Herbal Tea Crafting",
    titleVi: "Khám Phá Phố Đông Y Chợ Lớn & Pha Chế Trà Thảo Mộc Bản Địa",
    hostId: "user-admin",
    hostName: "Thầy Thuốc Trần Đông Y",
    hostAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    hostBio: "Traditional herbalist practitioner along Lương Nhữ Học heritage street.",
    category: "herbal",
    district: "District 5 (Quận 5 - Hải Thượng Lãn Ông)",
    address: "118 Hải Thượng Lãn Ông, Phường 10, Quận 5, TP. Hồ Chí Minh",
    latitude: 10.7512,
    longitude: 106.6645,
    price: 450000,
    durationMinutes: 90,
    maxGuests: 6,
    description: "Breathe in the rich scents of dried cinnamon, star anise, and lotus stamens. Visit family herbal apothecary drawers and blend your personalized cooling herbal infusion based on traditional wellness wisdom.",
    culturalStory: "Hải Thượng Lãn Ông street is Vietnam's oldest continuous center of traditional medicine, preserving both Sino-Vietnamese herbology and indigenous Southern herbal remedies (Thuốc Nam).",
    ingredientsOrTools: [
      "Dried royal lotus seeds & lotus stamens (Hạt sen, tâm sen)",
      "Organic chrysanthemum blossoms, licorice root & goji berries",
      "Traditional brass apothecary balance scales (Cân tiểu ly)",
    ],
    etiquetteTips: [
      "Keep voice low when walking inside operating apothecary shops.",
      "Do not touch medicinal roots in open jars without the host's guidance.",
    ],
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80",
    ],
    rating: 4.97,
    reviewCount: 42,
    qcVerified: true,
    slots: [
      { id: "slot-tea-1", date: "2026-10-24", startTime: "16:00", endTime: "17:30", capacity: 6, bookedCount: 4 },
      { id: "slot-tea-2", date: "2026-10-26", startTime: "14:00", endTime: "15:30", capacity: 6, bookedCount: 0 },
    ],
    ragKnowledgeDoc: {
      history: "Southern Thuốc Nam emphasizes harmony with tropical climate through cooling herbal broths (Sâm mía lau, Atiso, Cúc hoa).",
      techniques: [
        "Measuring balanced yin-yang proportions using brass counterweights.",
        "Controlled low-temperature water steeping to retain aromatic essential oils.",
      ],
      safetyNotes: "All herbs are culinary-grade and safe for general consumption; caffeine-free.",
      bilingualDictionary: [
        { en: "Apothecary / Herbal pharmacy", vi: "Tiệm thuốc bắc", note: "Historic medicinal herb shop" },
        { en: "Cooling herbal tea", vi: "Nước mát / Trà thảo mộc", note: "Traditional restorative beverage" },
      ],
    },
  },
];

export const INITIAL_RSVPS: RsvpBooking[] = [
  {
    id: "rsvp-1001",
    workshopId: "ws-che-buoi",
    workshopTitle: "Old-Alley Authentic Chè Bưởi & Pomelo Blossom Cooking",
    slotId: "slot-cb-1",
    date: "2026-10-24",
    time: "09:30 - 11:00",
    travelerId: "user-maya",
    travelerName: "Maya Jenkins",
    travelerEmail: "maya.traveler@example.com",
    guestsCount: 2,
    totalPrice: 900000,
    platformFee: 108000, // 12% VieBee
    hostPayout: 792000,  // 88% Host
    status: "CONFIRMED",
    qrCodeToken: "VIEBEE-PASS-1001-MAYACHE",
    bookedAt: "2026-10-21 14:20",
    address: "Hẻm 242/18 Nguyễn Thiện Thuật, Phường 3, Quận 3, TP. Hồ Chí Minh",
  },
];

export const INITIAL_COPILOT_CHATS: CopilotChatMessage[] = [
  {
    id: "chat-msg-1",
    workshopId: "ws-che-buoi",
    senderId: "user-maya",
    senderName: "Maya Jenkins",
    senderRole: "TRAVELER",
    originalText: "Hello Bà Ba! Is it okay if I arrive 10 minutes early? Also, are nuts included in the dessert? I have a mild cashew allergy.",
    originalLanguage: "en",
    translatedText: "Dạ chào Bà Ba! Con đến sớm 10 phút được không ạ? Và món chè này có hạt điều không ạ? Con bị dị ứng nhẹ với hạt điều.",
    culturalNote: "Greeted elder host politely with 'Dạ chào Bà'. Translated allergy concern clearly.",
    timestamp: "10:15 AM",
  },
  {
    id: "chat-msg-2",
    workshopId: "ws-che-buoi",
    senderId: "user-baba",
    senderName: "Bà Ba (Nguyễn Thị Mai)",
    senderRole: "HOST",
    originalText: "Chào con! Con đến sớm ngồi uống trà lài nha. Chè của bà chỉ rắc đậu phộng rang giòn, không có hạt điều. Bà sẽ để riêng đĩa đậu phộng cho con.",
    originalLanguage: "vi",
    translatedText: "Welcome, dear! You can arrive early and sip some jasmine tea. My chè only uses toasted peanuts, no cashews at all. I will keep the peanut bowl separate for you.",
    culturalNote: "Southern hospitality: offering hot jasmine tea to arriving guests is customary in alley homes.",
    timestamp: "10:18 AM",
  },
  {
    id: "chat-msg-3",
    workshopId: "ws-che-buoi",
    senderId: "ai-copilot",
    senderName: "VieBee Cultural Copilot",
    senderRole: "AI_COPILOT",
    originalText: "Copilot Etiquette Brief: When arriving at Bà Ba's home, remember to slip off your shoes at the tiled porch. Bà Ba has set aside fresh pomelo rind and fragrant pomelo blossom water for your session today!",
    originalLanguage: "en",
    translatedText: "Lời khuyên văn hóa VieBee: Khi đến nhà Bà Ba, hãy tháo giày trước hiên gạch. Bà Ba đã chuẩn bị sẵn cùi bưởi tươi và nước hoa bưởi cho buổi trải nghiệm hôm nay!",
    culturalNote: "Automated ground context based on verified workshop sheet.",
    timestamp: "10:19 AM",
  },
];

/**
 * Ensures localStorage has the complete initial mock datasets for autonomous frontend operation.
 */
export const initializeSeedData = () => {
  if (typeof window === "undefined") return;

  if (!storageHelper.get(VIEBEE_STORAGE_KEYS.WORKSHOPS, null)) {
    storageHelper.set(VIEBEE_STORAGE_KEYS.WORKSHOPS, INITIAL_WORKSHOPS);
  }

  if (!storageHelper.get(VIEBEE_STORAGE_KEYS.CURRENT_USER, null)) {
    storageHelper.set(VIEBEE_STORAGE_KEYS.CURRENT_USER, INITIAL_DEMO_USERS[0]); // Default Maya (Traveler)
  }

  if (!storageHelper.get(VIEBEE_STORAGE_KEYS.RSVPS, null)) {
    storageHelper.set(VIEBEE_STORAGE_KEYS.RSVPS, INITIAL_RSVPS);
  }

  if (!storageHelper.get(VIEBEE_STORAGE_KEYS.COPILOT_CHATS, null)) {
    storageHelper.set(VIEBEE_STORAGE_KEYS.COPILOT_CHATS, INITIAL_COPILOT_CHATS);
  }
};
