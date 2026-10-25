import { mockHttpAdapter } from "@/src/@core/http/mock-adapter";
import { RsvpBooking } from "@/src/@core/utils/seed-data";

export const rsvpService = {
  createRsvpAsync: async (payload: {
    workshopId: string;
    slotId: string;
    guestsCount: number;
  }): Promise<RsvpBooking> => {
    const res = await mockHttpAdapter.createRsvp(payload);
    return res.data;
  },

  getRsvpsForTravelerAsync: async (travelerId: string): Promise<RsvpBooking[]> => {
    const res = await mockHttpAdapter.getRsvpsForTraveler(travelerId);
    return res.data;
  },

  getRsvpsForHostAsync: async (hostId: string): Promise<RsvpBooking[]> => {
    const res = await mockHttpAdapter.getRsvpsForHost(hostId);
    return res.data;
  },
};
