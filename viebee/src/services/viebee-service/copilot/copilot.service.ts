import { mockHttpAdapter } from "@/src/@core/http/mock-adapter";
import { CopilotChatMessage } from "@/src/@core/utils/seed-data";

export const copilotService = {
  getChatMessagesAsync: async (workshopId: string): Promise<CopilotChatMessage[]> => {
    const res = await mockHttpAdapter.getChatMessages(workshopId);
    return res.data;
  },

  sendCopilotMessageAsync: async (payload: {
    workshopId: string;
    text: string;
  }): Promise<{ userMessage: CopilotChatMessage; aiReply?: CopilotChatMessage }> => {
    const res = await mockHttpAdapter.sendCopilotMessage(payload);
    return res.data;
  },
};
