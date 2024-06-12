import { Module } from '@nestjs/common';
import { AmoCrmController } from './amo-crm.controller';
import { AmoCrmService } from './amo-crm.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [AmoCrmController],
  providers: [AmoCrmService]
})
export class AmoCrmModule { }
