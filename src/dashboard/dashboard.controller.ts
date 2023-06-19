import {
  Controller,
  Get
} from '@nestjs/common';
import { DashboadService } from './dashboard.service';
import { DashboardDto } from './dashboard.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboadService) { }

  @Get()
  async getCountTotal(): Promise<DashboardDto> {
    const total = await this.dashboardService.getCountTotal();
    return total
  }

}
