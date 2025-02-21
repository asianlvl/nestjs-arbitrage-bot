import { Controller, Get, Query } from '@nestjs/common';
import { StoryhuntService } from './storyhunt.service';

@Controller('storyhunt')
export class StoryhuntController {
  constructor(private readonly storyhuntService: StoryhuntService) {}

  @Get('hello')
  getHello(): string {
    return 'Hello World!!';
  }

  @Get('v3-routing-exact-input')
  async v3RoutingExactInput(
    @Query('tokenIn') tokenIn: string,
    @Query('tokenInDecimal') tokenInDecimal: string,
    @Query('tokenOut') tokenOut: string,
    @Query('currencySlippage') currencySlippage: string,
    @Query('amountIn') amountIn: string,
    @Query('exactIn') exactIn: boolean,
    @Query('deadlineInUnix') deadlineInUnix: string,
  ): Promise<any> {
    return this.storyhuntService.v3RoutingExactInput(
      tokenIn,
      tokenInDecimal,
      tokenOut,
      currencySlippage,
      amountIn,
      exactIn,
      deadlineInUnix,
    );
  }

  //   @Post('approve-tokens')
  //   async approveTokens(
  //     @Query('token1Address') token1Address: string,
  //     @Query('token1Decimal') token1Decimal: string,
  //     @Query('amount1') amount1: string,
  //     @Query('bestRoute') bestRoute: string[],
  //   ): Promise<any> {
  //     return this.storyhuntService.routerTokenApproval(
  //       token1Address,
  //       token1Decimal,
  //       amount1,
  //       bestRoute,
  //     );
  //   }

  //   @Get('price/v2')
  //   async getStoryhuntV2Price(
  //     @Query('tokenIn') tokenIn: string,
  //     @Query('tokenOut') tokenOut: string,
  //     @Query('amountIn') amountIn: string,
  //   ) {
  //     return this.storyhuntService.getStoryhuntV2Price(tokenIn, tokenOut, amountIn);
  //   }

  //   @Get('swap/v2')
  //   async swapTokensV2(
  //     @Query('tokenIn') tokenIn: string,
  //     @Query('tokenOut') tokenOut: string,
  //     @Query('amountIn') amountIn: string,
  //     @Query('to') to: string,
  //   ) {
  //     return this.storyhuntService.swapTokensV2(tokenIn, tokenOut, amountIn, to);
  //   }
}
