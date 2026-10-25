import { Controller, Post, Body, Inject } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CopilotService } from "@application/copilot/copilot.service";
import {
  CopilotChatInputDto,
  CopilotResponseOutputDto,
  TranslateInputDto,
} from "@application-contracts/dtos";

@ApiTags("AI Cultural Copilot (FastAPI Gateway)")
@Controller("copilot")
export class CopilotController {
  constructor(
    @Inject(CopilotService)
    private readonly copilotService: CopilotService
  ) {}

  @Post("chat")
  @ApiOperation({
    summary: "Submit question to AI Cultural Copilot (bridges English <-> Vietnamese with RAG grounding)",
  })
  @ApiResponse({ status: 200, type: CopilotResponseOutputDto })
  async chat(@Body() dto: CopilotChatInputDto): Promise<CopilotResponseOutputDto> {
    return this.copilotService.processChat(dto);
  }

  @Post("translate")
  @ApiOperation({
    summary: "Dedicated bilingual translation endpoint with respectful Vietnamese tone",
  })
  async translate(@Body() dto: TranslateInputDto) {
    return this.copilotService.translate(dto);
  }
}
