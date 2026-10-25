import { authService } from "./auth/auth.service";
import { workshopService } from "./workshop/workshop.service";
import { rsvpService } from "./rsvp/rsvp.service";
import { copilotService } from "./copilot/copilot.service";
import { qcService } from "./qc/qc.service";

export const viebeeService = {
  auth: authService,
  workshop: workshopService,
  rsvp: rsvpService,
  copilot: copilotService,
  qc: qcService,
};

export default viebeeService;
