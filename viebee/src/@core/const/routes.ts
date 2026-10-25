export const APP_ROUTES = {
  home: "/",
  workshops: "/workshops/",
  workshopDetail: (id: string) => `/workshops/${id}/`,
  culturalMap: "/cultural-map/",
  copilot: "/copilot/",
  hostDashboard: "/host/dashboard/",
  createWorkshop: "/host/create-workshop/",
  travelerBookings: "/traveler/bookings/",
  adminVerification: "/admin/verification/",
  signIn: "/signin/",
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];

export type MenuItem = {
  name: string;
  nameVi: string;
  path: string;
  badge?: string;
};

export const MAIN_NAV_ITEMS: MenuItem[] = [
  { name: "Living Heritage", nameVi: "Trang chủ", path: APP_ROUTES.home },
  { name: "Cultural Map", nameVi: "Bản đồ văn hóa", path: APP_ROUTES.culturalMap, badge: "GIS" },
  { name: "Micro-Workshops", nameVi: "Trải nghiệm bản địa", path: APP_ROUTES.workshops },
  { name: "AI Copilot", nameVi: "Trợ lý văn hóa AI", path: APP_ROUTES.copilot, badge: "RAG" },
];

export const HOST_NAV_ITEMS: MenuItem[] = [
  { name: "Host Dashboard", nameVi: "Bảng điều khiển host", path: APP_ROUTES.hostDashboard },
  { name: "List a Workshop", nameVi: "Tạo trải nghiệm", path: APP_ROUTES.createWorkshop },
];

export const TRAVELER_NAV_ITEMS: MenuItem[] = [
  { name: "My RSVPs & Passes", nameVi: "Vé của tôi", path: APP_ROUTES.travelerBookings },
];
