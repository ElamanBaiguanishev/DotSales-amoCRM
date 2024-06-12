import { Controller, Get, Query } from '@nestjs/common';
import { AmoCrmService } from './amo-crm.service';

@Controller('amo-crm')
export class AmoCrmController {
    constructor(private readonly amoCrmService: AmoCrmService) { }

    @Get('leads')
    async getLeads(@Query('query') query: string) {
        return this.amoCrmService.getLeads(query);
    }

    // @Get(':id')
    // async getLeads(@Query('query') query: string) {
    //     return this.amoCrmService.getLeads(query);
    // }
}