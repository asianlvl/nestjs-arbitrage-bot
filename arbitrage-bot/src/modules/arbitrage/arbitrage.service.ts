import { Injectable, Logger } from '@nestjs/common';
import { PiperxService } from '../piperx/piperx.service';
import { StoryhuntService } from '../storyhunt/storyhunt.service';
import { ethers } from 'ethers';

@Injectable()
export class ArbitrageService {
  private readonly logger = new Logger(ArbitrageService.name);

  constructor(
    private readonly piperxService: PiperxService,
    private readonly storyhuntService: StoryhuntService,
  ) {}

  /**
   * Kiểm tra cơ hội Arbitrage giữa Piperx và Storyhunt
   */
  async checkArbitrageOpportunityAmountInPiperxV3ToStoryhuntV3(
    tokenIn: string,
    tokenInDecimal: string,
    tokenOut: string,
    amountIn: string,
  ) {
    try {
      const pricePiperxV3 = await this.piperxService.v3RoutingExactInput(
        tokenIn,
        tokenInDecimal,
        tokenOut,
        amountIn,
      );
      // const priceStoryhuntV3 = await this.storyhuntService.v3RoutingExactInput(
      //   tokenIn,
      //   tokenInDecimal,
      //   tokenOut,
      //   amountIn,
      //   true,
      // );

      // return { pricePiperxV3, priceStoryhuntV3 };
      return { pricePiperxV3 };
      // const profit = ethers.parseUnits(pricePiperxV3, 18).sub(ethers.parseUnits(priceStoryhuntV3, 18));

      // if (profit > 0) {
      //   this.logger.log(`Cơ hội Arbitrage: Mua ở V2, bán ở V3. Lợi nhuận: ${ethers.formatUnits(profit, 18)}`);
      //   return { arbitrage: true, profit: ethers.formatUnits(profit, 18) };
      // } else {
      //   this.logger.log('Không có cơ hội Arbitrage.');
      //   return { arbitrage: false, profit: '0' };
      // }
    } catch (error) {
      this.logger.error(`Lỗi khi kiểm tra Arbitrage: ${error}`);
      throw error;
    }
  }

  /**
   * Thực hiện Arbitrage nếu có cơ hội
   */
  // async executeArbitrage(tokenIn: string, tokenOut: string, amountIn: string, to: string) {
  //   const opportunity = await this.checkArbitrageOpportunity(tokenIn, tokenOut, amountIn);

  //   if (!opportunity.arbitrage) {
  //     throw new Error('Không có cơ hội Arbitrage');
  //   }

  //   // Mua token ở Piperx V2
  //   await this.piperxService.swapTokensV2(tokenIn, tokenOut, amountIn, to);

  //   // Bán lại token trên Piperx V3 (chưa triển khai, cần viết thêm)
  //   // await this.piperxService.swapTokensV3(tokenOut, tokenIn, amountOut, to);

  //   return { success: true, message: 'Arbitrage executed' };
  // }
}
