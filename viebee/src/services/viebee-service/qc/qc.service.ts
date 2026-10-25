import { mockHttpAdapter } from "@/src/@core/http/mock-adapter";
import { WorkshopItem } from "@/src/@core/utils/seed-data";

export const qcService = {
  verifyWorkshopAsync: async (workshopId: string, isApproved: boolean): Promise<WorkshopItem | null> => {
    const res = await mockHttpAdapter.verifyWorkshop(workshopId, isApproved);
    return res.data;
  },
};
