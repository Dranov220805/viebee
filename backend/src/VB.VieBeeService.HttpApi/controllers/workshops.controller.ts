import { Controller, Get, Post, Body, Param, Query, Inject } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { WorkshopService } from "@application/workshops/workshop.service";
import { CreateWorkshopInputDto, WorkshopOutputDto } from "@application-contracts/dtos";

@ApiTags("Workshops & Living Heritage")
@Controller("workshops")
export class WorkshopsController {
  constructor(
    @Inject(WorkshopService)
    private readonly workshopService: WorkshopService
  ) {}

  @Get()
  @ApiOperation({ summary: "List living heritage workshops with optional category and search filters" })
  @ApiQuery({ name: "category", required: false, description: "Category filter (culinary, bamboo-weaving, pottery, etc.)" })
  @ApiQuery({ name: "q", required: false, description: "Search query across title, district, and artisan name" })
  @ApiResponse({ status: 200, type: [WorkshopOutputDto] })
  async getWorkshops(
    @Query("category") category?: string,
    @Query("q") query?: string
  ): Promise<WorkshopOutputDto[]> {
    return this.workshopService.findAll(category, query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get detailed workshop and verified knowledge sheet" })
  @ApiResponse({ status: 200, type: WorkshopOutputDto })
  async getWorkshopById(@Param("id") id: string): Promise<WorkshopOutputDto> {
    return this.workshopService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: "List a new micro-workshop (Host 3-step listing tool)" })
  @ApiResponse({ status: 201, type: WorkshopOutputDto })
  async createWorkshop(@Body() dto: CreateWorkshopInputDto): Promise<WorkshopOutputDto> {
    // In production, hostId is extracted from Bearer JWT
    return this.workshopService.create(dto, "user-baba");
  }
}
