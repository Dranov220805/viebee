import { mockHttpAdapter } from "@/src/@core/http/mock-adapter";
import { UserAccount } from "@/src/@core/utils/seed-data";

export const authService = {
  getCurrentUserAsync: async (): Promise<UserAccount> => {
    const res = await mockHttpAdapter.getCurrentUser();
    return res.data;
  },

  switchDemoUserAsync: async (userId: string): Promise<UserAccount> => {
    const res = await mockHttpAdapter.switchDemoUser(userId);
    return res.data;
  },
};
