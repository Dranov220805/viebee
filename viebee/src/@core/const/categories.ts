export interface CategoryItem {
  id: string;
  name: string;
  nameVi: string;
  icon: string;
  tagline: string;
}

export const WORKSHOP_CATEGORIES: CategoryItem[] = [
  {
    id: "culinary",
    name: "Culinary & Sweets",
    nameVi: "Ẩm thực & Chè cổ truyền",
    icon: "Utensils",
    tagline: "Family recipes, herbal broths, and traditional desserts",
  },
  {
    id: "bamboo-weaving",
    name: "Bamboo & Rattan Weaving",
    nameVi: "Đan lát mây tre",
    icon: "Boxes",
    tagline: "Eco-friendly handmade homeware from natural fibers",
  },
  {
    id: "ceramics",
    name: "Saigon Pottery & Ceramics",
    nameVi: "Gốm thủ công Nam Bộ",
    icon: "Layers",
    tagline: "Wheel throwing and local clay glazing in alley workshops",
  },
  {
    id: "textiles",
    name: "Ao Dai & Silk Embroidery",
    nameVi: "May thêu trang phục truyền thống",
    icon: "Scissors",
    tagline: "Intricate needlework and traditional garment silhouettes",
  },
  {
    id: "folk-art",
    name: "Folk Painting & Calligraphy",
    nameVi: "Tranh dân gian & Thư pháp",
    icon: "Palette",
    tagline: "Natural pigment prints on handmade Dó paper",
  },
  {
    id: "herbal",
    name: "Herbal Remedies & Tea Ceremony",
    nameVi: "Thảo mộc & Trà đạo Chợ Lớn",
    icon: "Sparkles",
    tagline: "Centuries-old Southern herbology and mindful tea brewing",
  },
];

export const DISTRICT_OPTIONS = [
  { value: "d1", label: "District 1 (Quận 1 - Bến Thành / Đa Kao)", lat: 10.7769, lng: 106.7009 },
  { value: "d3", label: "District 3 (Quận 3 - Bàn Cờ / Nguyễn Thiện Thuật)", lat: 10.7828, lng: 106.6875 },
  { value: "d5", label: "District 5 (Quận 5 - Chợ Lớn / Triệu Quang Phục)", lat: 10.7556, lng: 106.6622 },
  { value: "d4", label: "District 4 (Quận 4 - Vĩnh Khánh / Bến Vân Đồn)", lat: 10.7625, lng: 106.7025 },
  { value: "binh-thanh", label: "Bình Thạnh (Thị Nghè / Thanh Đa)", lat: 10.8016, lng: 106.7118 },
];
