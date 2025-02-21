import { Module } from '@nestjs/common';
import { ArbitrageService } from './arbitrage.service';
import { ArbitrageController } from './arbitrage.controller';
import { PiperxService } from '../piperx/piperx.service';
import { StoryhuntService } from '../storyhunt/storyhunt.service';

@Module({
  imports: [],
  controllers: [ArbitrageController],
  providers: [ArbitrageService, PiperxService, StoryhuntService],
})
export class ArbitrageModule {}
