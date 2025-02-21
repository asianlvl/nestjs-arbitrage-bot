import { Controller, Get, Query } from '@nestjs/common';
import { ArbitrageService } from './arbitrage.service';

@Controller('arbitrage')
export class ArbitrageController {
  constructor(private readonly arbitrageService: ArbitrageService) {}

  @Get('piperx-v3-to-storyhunt-v3-exact-input')
  async checkArbitrage(
    @Query('tokenIn') tokenIn: string,
    @Query('tokenInDecimal') tokenInDecimal: string,
    @Query('tokenOut') tokenOut: string,
    @Query('amountIn') amountIn: string,
  ) {
    return this.arbitrageService.checkArbitrageOpportunityAmountInPiperxV3ToStoryhuntV3(
      tokenIn,
      tokenInDecimal,
      tokenOut,
      amountIn,
    );
  }

  // @Get('execute')
  // async executeArbitrage(
  //   @Query('tokenIn') tokenIn: string,
  //   @Query('tokenOut') tokenOut: string,
  //   @Query('amountIn') amountIn: string,
  //   @Query('to') to: string,
  // ) {
  //   return this.arbitrageService.executeArbitrage(
  //     tokenIn,
  //     tokenOut,
  //     amountIn,
  //     to,
  //   );
  // }
}
