export const ACCESS_TOKEN_KEY = "viebee_access_token";
export const REFRESH_TOKEN_KEY = "viebee_refresh_token";
export const AUTHORIZATION_KEY = "Authorization";
export const TOKEN_TYPE_KEY = "Bearer";

export const VIEBEE_STORAGE_KEYS = {
  CURRENT_USER: "viebee_current_user",
  AUTH_TOKEN: "viebee_auth_token",
  WORKSHOPS: "viebee_workshops_data",
  RSVPS: "viebee_rsvps_data",
  COPILOT_CHATS: "viebee_copilot_chats",
  REVIEWS: "viebee_reviews_data",
  QC_VERIFICATIONS: "viebee_qc_verifications",
  ACTIVE_LOCALE: "viebee_locale",
} as const;

export const PLATFORM_CONFIG = {
  COMMISSION_RATE: 0.12, // 12% VieBee take rate
  HOST_PAYOUT_RATE: 0.88, // 88% goes directly into host account
  CURRENCY: "VND",
  DEFAULT_PRICE: 450000,
  DEFAULT_CITY: "Ho Chi Minh City",
  CONTACT_EMAIL: "support@viebee.vn",
  UII_SANDBOX_YEAR: "2026",
};

export const DEFAULT_AVATAR = "/images/main/logo_ITZone.png";
