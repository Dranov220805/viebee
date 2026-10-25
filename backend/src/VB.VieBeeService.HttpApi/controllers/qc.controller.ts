import { Controller, Patch, Param, Body, Inject } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { QcService } from "@application/qc/qc.service";
import { VerifyWorkshopInputDto, WorkshopOutputDto } from "@application-contracts/dtos";

@ApiTags("QC & Community Verification")
@Controller("qc")
export class QcController {
  constructor(
    @Inject(QcService)
    private readonly qcService: QcService
  ) {}

  @Patch("verify/:workshopId")
  @ApiOperation({ summary: "Grant or revoke QC Verified badge for a workshop listing" })
  @ApiResponse({ status: 200, type: WorkshopOutputDto })
  async verifyWorkshop(
    @Param("workshopId") workshopId: string,
    @Body() dto: VerifyWorkshopInputDto
  ): Promise<WorkshopOutputDto> {
    return this.qcService.verifyWorkshop(workshopId, dto.isApproved);
  }
}
