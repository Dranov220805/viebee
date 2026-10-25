import { mockHttpAdapter } from "@/src/@core/http/mock-adapter";
import { WorkshopItem } from "@/src/@core/utils/seed-data";

export const workshopService = {
  getWorkshopsAsync: async (params?: { category?: string; query?: string }): Promise<WorkshopItem[]> => {
    const res = await mockHttpAdapter.getWorkshops(params);
    return res.data;
  },

  getWorkshopByIdAsync: async (id: string): Promise<WorkshopItem | null> => {
    const res = await mockHttpAdapter.getWorkshopById(id);
    return res.data;
  },

  createWorkshopAsync: async (workshop: Partial<WorkshopItem>): Promise<WorkshopItem> => {
    const res = await mockHttpAdapter.createWorkshop(workshop);
    return res.data;
  },
};
