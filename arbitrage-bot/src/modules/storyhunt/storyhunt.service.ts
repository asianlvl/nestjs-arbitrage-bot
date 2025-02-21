import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { swapRouterV3 } from '@storyhunt/wrapper-sdk';
import { initClient } from '@storyhunt/wrapper-sdk';
import { ChainId } from '@storyhunt/sdk-core';
// import { QUOTER_CONTRACT_ADDRESS } from '@storyhunt/default-list/build/storyhunt-default.constantlist.json';
// import { abi as IStoryhuntV2RouterABI } from '@storyhunt/v2-periphery/build/IStoryhuntV2Router02.json';
// import { abi as IStoryhuntV3RouterABI } from '@storyhunt/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json';
// import { routingExactInput } from '@storyhunt/sdk/dist/routing';
// import { swap, routerTokenApproval } from '@storyhunt/sdk/dist/core';
// import { WIP_ADDRESS } from '@storyhunt/sdk/dist/constant';
// import { v2GetPrice, v2GetPriceWithDecimals } from '@storyhunt/sdk/dist/core';
// import { v3GetPrice, v3GetPriceWithDecimals } from '@storyhunt/sdk/dist/core';

@Injectable()
export class StoryhuntService {
  private readonly logger = new Logger(StoryhuntService.name);
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private storyhuntV2Router: ethers.Contract;
  private storyhuntV3Router: ethers.Contract;
  private storyhuntQuote: ethers.Contract;

  constructor(private configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('app.rpcUrl');
    console.log('rpcUrl', rpcUrl);
    const privateKey = this.configService.get<string>('app.privateKey');
    if (!privateKey) {
      throw new Error('Private key is not defined in the configuration');
    }

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    // Initialize provider using IIFE
    (async () => {
      await this.initializeProvider();
    })().catch((error) => {
      this.logger.error('Failed to initialize provider:', error);
    });
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    console.log('this.wallet', this.wallet);

    // this.storyhuntV2Router = new ethers.Contract(
    //   storyhuntV2RouterAddress,
    //   IStoryhuntV2RouterABI,
    //   this.wallet,
    // );
    // this.storyhuntV3Router = new ethers.Contract(
    //   storyhuntV3RouterAddress,
    //   IStoryhuntV3RouterABI,
    //   this.wallet,
    // );
  }
  private async initializeProvider() {
    try {
      // Wait for the provider to be ready
      if (!this.provider.ready) throw new Error('Provider not ready');
      const network = await this.provider.getNetwork();
      this.logger.log(
        `Connected to network: ${network.name} (${network.chainId})`,
      );
    } catch (error) {
      this.logger.error('Failed to initialize provider:', error);
      throw error;
    }
  }

  // Add this method to ensure provider is ready before any operation
  private ensureProviderReady() {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }
    if (!this.provider.ready) {
      throw new Error('Provider is not ready');
    }
  }

  /**
   * Finding the best swap path
   */
  async v3RoutingExactInput(
    tokenIn: string,
    tokenInDecimal: string,
    tokenOut: string,
    currencySlippage: string,
    amountIn: string,
    exactIn: boolean,
    deadlineInUnix: string,
  ) {
    // try {
    //   const routes = await swapRouterV3(tokenIn, tokenOut, amountIn, exactIn);
    //   return { routes };
    // } catch (error) {
    //   this.logger.error(`Error when finding best swap path: ${error}`);
    //   throw error;
    // }
    await initClient({
      privateKey: this.configService.get<string>('app.privateKey'),
      graph_url: '',
      graph_auth: '',
      chainId: ChainId.STORY,
      jsonRPC: '',
    });
    // Convert currencySlippage and deadlineInUnix to number
    const currencySlippageNumber = parseFloat(currencySlippage);
    const deadlineInUnixNumber = parseInt(deadlineInUnix);


    const routes = await swapRouterV3(
      tokenIn,
      tokenOut,
      amountIn,
      exactIn,
      currencySlippageNumber,
      deadlineInUnixNumber,
    );
    if (routes instanceof Error) {
      console.error('Error finding routes:', routes.message);
      return;
    }
    console.log('inputAmount:', routes[0].inputAmount.toSignificant(10));
    console.log('outputAmount:', routes[0].outputAmount.toSignificant(10));
    return routes[0].outputAmount.toSignificant(10);
  }

  /**
   * Lấy giá token trên Storyhunt V2
   */
  // async getStoryhuntV2Price(tokenIn: string, tokenOut: string, amountIn: string) {
  //   try {
  //     const amountsOut = await this.storyhuntV2Router.getAmountsOut(amountIn, [
  //       tokenIn,
  //       tokenOut,
  //     ]);
  //     return amountsOut[1].toString();
  //   } catch (error) {
  //     this.logger.error(`Lỗi khi lấy giá Storyhunt V2: ${error.message}`);
  //     throw error;
  //   }
  // }

  /**
   * Swap token trên Storyhunt V2
   */
  // async swapTokensV2(
  //   tokenIn: string,
  //   tokenOut: string,
  //   amountIn: string,
  //   to: string,
  // ) {
  //   try {
  //     const amountsOut = await this.getStoryhuntV2Price(
  //       tokenIn,
  //       tokenOut,
  //       amountIn,
  //     );
  //     const minAmountOut = ethers.parseUnits(amountsOut, 18).mul(98).div(100); // Trượt giá 2%

  //     const tx = await this.storyhuntV2Router.swapExactTokensForTokens(
  //       amountIn,
  //       minAmountOut,
  //       [tokenIn, tokenOut],
  //       to,
  //       Math.floor(Date.now() / 1000) + 60 * 10, // Hết hạn sau 10 phút
  //     );
  //     await tx.wait();
  //     return tx.hash;
  //   } catch (error) {
  //     this.logger.error(`Lỗi khi swap trên Storyhunt V2: ${error.message}`);
  //     throw error;
  //   }
  // }
}
