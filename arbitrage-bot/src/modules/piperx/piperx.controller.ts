import { Controller, Get, Post, Query } from '@nestjs/common';
import { PiperxService } from './piperx.service';

@Controller('piperx')
export class PiperxController {
  constructor(private readonly piperxService: PiperxService) {}

  @Get('hello')
  getHello(): string {
    return 'Hello World!!';
  }

  // async routingExactOutput(
  //   tokenIn: string,
  //   tokenInDecimal: string,
  //   tokenOut: string,
  //   amountOut: string,
  // )
  @Get('routing-exact-input')
  async routingExactInput(
    @Query('tokenIn') tokenIn: string,
    @Query('tokenInDecimal') tokenInDecimal: string,
    @Query('tokenOut') tokenOut: string,
    @Query('amountIn') amountIn: string,
  ) {
    return this.piperxService.routingExactInput(
      tokenIn,
      tokenInDecimal,
      tokenOut,
      amountIn,
    );
  }

  // async v2RoutingExactInput(
  //   tokenIn: string,
  //   tokenInDecimal: string,
  //   tokenOut: string,
  //   amountIn: string,
  // )
  @Get('v2-routing-exact-input')
  async v2RoutingExactInput(
    @Query('tokenIn') tokenIn: string,
    @Query('tokenInDecimal') tokenInDecimal: string,
    @Query('tokenOut') tokenOut: string,
    @Query('amountIn') amountIn: string,
  ) {
    return this.piperxService.v2RoutingExactInput(
      tokenIn,
      tokenInDecimal,
      tokenOut,
      amountIn,
    );
  }

  // async v2RoutingExactOutput(
  //   tokenIn: string,
  //   tokenInDecimal: string,
  //   tokenOut: string,
  //   amountOut: string,
  // )
  @Get('v2-routing-exact-output')
  async v2RoutingExactOutput(
    @Query('tokenIn') tokenIn: string,
    @Query('tokenInDecimal') tokenInDecimal: string,
    @Query('tokenOut') tokenOut: string,
    @Query('amountOut') amountOut: string,
  ) {
    return this.piperxService.v2RoutingExactOutput(
      tokenIn,
      tokenInDecimal,
      tokenOut,
      amountOut,
    );
  }

  // async v3RoutingExactInput(
  //   tokenIn: string,
  //   tokenInDecimal: string,
  //   tokenOut: string,
  //   amountIn: string,
  // )
  @Get('v3-routing-exact-input')
  async v3RoutingExactInput(
    @Query('tokenIn') tokenIn: string,
    @Query('tokenInDecimal') tokenInDecimal: string,
    @Query('tokenOut') tokenOut: string,
    @Query('amountIn') amountIn: string,
  ) {
    return this.piperxService.v3RoutingExactInput(
      tokenIn,
      tokenInDecimal,
      tokenOut,
      amountIn,
    );
  }

  // async v3RoutingExactOutput(
  //   tokenIn: string,
  //   tokenInDecimal: string,
  //   tokenOut: string,
  //   amountOut: string,
  // )
  @Get('v3-routing-exact-output')
  async v3RoutingExactOutput(
    @Query('tokenIn') tokenIn: string,
    @Query('tokenInDecimal') tokenInDecimal: string,
    @Query('tokenOut') tokenOut: string,
    @Query('amountOut') amountOut: string,
  ) {
    return this.piperxService.v3RoutingExactOutput(
      tokenIn,
      tokenInDecimal,
      tokenOut,
      amountOut,
    );
  }

  // async getPiperxV2Price(tokenIn: string, tokenOut: string)
  @Get('v2price')
  async getPiperxV2Price(
    @Query('tokenIn') tokenIn: string,
    @Query('tokenOut') tokenOut: string,
  ) {
    return this.piperxService.getPiperxV2Price(tokenIn, tokenOut);
  }

  /**
   * Get the price of the tokens using v2 with decimals
   * export declare const v2GetPriceWithDecimals: (token1: string, token2: string, decimal1: number, decimal2: number) => Promise<number>;
   */
  @Get('v2price-with-decimals')
  async getPiperxV2PriceWithDecimals(
    @Query('tokenIn') tokenIn: string,
    @Query('tokenOut') tokenOut: string,
    @Query('tokenInDecimal') tokenInDecimal: number,
    @Query('tokenOutDecimal') tokenOutDecimal: number,
  ) {
    return this.piperxService.getPiperxV2PriceWithDecimals(
      tokenIn,
      tokenOut,
      tokenInDecimal,
      tokenOutDecimal,
    );
  }
  /**
   * Get the price of the tokens using v2 with decimals
   * export declare const v3GetPriceWithDecimals: (token1: string, token2: string, decimal1: number, decimal2: number, fee?: number) => Promise<number>;
   */
  @Get('v3price-with-decimals')
  async getPiperxV3PriceWithDecimals(
    @Query('tokenIn') tokenIn: string,
    @Query('tokenOut') tokenOut: string,
    @Query('tokenInDecimal') tokenInDecimal: number,
    @Query('tokenOutDecimal') tokenOutDecimal: number,
    @Query('fee') fee: number,
  ) {
    return this.piperxService.getPiperxV3PriceWithDecimals(
      tokenIn,
      tokenOut,
      tokenInDecimal,
      tokenOutDecimal,
      fee,
    );
  }

  @Post('approve-tokens')
  async approveTokens(
    @Query('token1Address') token1Address: string,
    @Query('token1Decimal') token1Decimal: string,
    @Query('amount1') amount1: string,
    @Query('bestRoute') bestRoute: string[],
  ): Promise<any> {
    return this.piperxService.routerTokenApproval(
      token1Address,
      token1Decimal,
      amount1,
      bestRoute,
    );
  }

  //   @Get('price/v2')
  //   async getPiperxV2Price(
  //     @Query('tokenIn') tokenIn: string,
  //     @Query('tokenOut') tokenOut: string,
  //     @Query('amountIn') amountIn: string,
  //   ) {
  //     return this.piperxService.getPiperxV2Price(tokenIn, tokenOut, amountIn);
  //   }

  //   @Get('swap/v2')
  //   async swapTokensV2(
  //     @Query('tokenIn') tokenIn: string,
  //     @Query('tokenOut') tokenOut: string,
  //     @Query('amountIn') amountIn: string,
  //     @Query('to') to: string,
  //   ) {
  //     return this.piperxService.swapTokensV2(tokenIn, tokenOut, amountIn, to);
  //   }
}
