import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers, providers } from '@piperx/sdk/node_modules/ethers';

import {
  routingExactInput,
  routingExactOutput,
  v2RoutingExactInput,
  v2RoutingExactOutput,
  v3RoutingExactInput,
  v3RoutingExactOutput,
} from '@piperx/sdk/dist/routing';
import {
  swap,
  routerTokenApproval,
  v2GetPrice,
  v2GetPriceWithDecimals,
  v3GetPriceWithDecimals,
} from '@piperx/sdk/dist/core';
// import { WIP_ADDRESS } from '@piperx/sdk/dist/constant';
// import { v2GetPrice, v2GetPriceWithDecimals } from '@piperx/sdk/dist/core';
// import { v3GetPrice, v3GetPriceWithDecimals } from '@piperx/sdk/dist/core';

@Injectable()
export class PiperxService {
  private readonly logger = new Logger(PiperxService.name);
  private provider: providers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private piperxV2Router: ethers.Contract;
  private piperxV3Router: ethers.Contract;

  constructor(private configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('app.rpcUrl');
    console.log('rpcUrl', rpcUrl);
    const privateKey = this.configService.get<string>('app.privateKey');
    if (!privateKey) {
      throw new Error('Private key is not defined in the configuration');
    }

    this.provider = new providers.JsonRpcProvider(rpcUrl);
    // Initialize provider using IIFE
    (async () => {
      await this.initializeProvider();
    })().catch((error) => {
      this.logger.error('Failed to initialize provider:', error);
    });
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    console.log('this.wallet', this.wallet);
  }

  private async initializeProvider() {
    try {
      // Wait for the provider to be ready
      await this.provider.ready;
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
  private async ensureProviderReady() {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }
    await this.provider.ready;
  }

  /**
   * routingExactInput
   * routingExactInput: (tokenIn: string, tokenOut: string, tokenInAmount: bigint, signer: ethers.Signer)
   */
  async routingExactInput(
    tokenIn: string,
    tokenInDecimal: string,
    tokenOut: string,
    amountIn: string,
  ) {
    await this.ensureProviderReady();
    // convert amountIn to bigint
    const amountInBigInt: ethers.BigNumber = ethers.utils.parseUnits(
      amountIn,
      tokenInDecimal,
    );
    console.log('amountInBigInt', amountInBigInt);
    try {
      const { bestRoute, maxAmountOut } = await routingExactInput(
        tokenIn,
        tokenOut,
        amountInBigInt.toBigInt(),
        this.wallet,
      );
      console.log('bestRoute', bestRoute);
      console.log('maxAmountOut', maxAmountOut.toString());
      return { bestRoute, maxAmountOut };
    } catch (error) {
      this.logger.error(`Error when finding best swap path: ${error}`);
      throw error;
    }
  }

  /**
   * routingExactOutput
   * routingExactOutput: (tokenIn: string, tokenOut: string, tokenOutAmount: bigint, signer: ethers.Signer)
   */
  async routingExactOutput(
    tokenIn: string,
    tokenInDecimal: string,
    tokenOut: string,
    amountOut: string,
  ) {
    await this.ensureProviderReady();
    // convert amountIn to bigint
    const amountOutBigInt: ethers.BigNumber = ethers.utils.parseUnits(
      amountOut,
      tokenInDecimal,
    );

    try {
      return await routingExactOutput(
        tokenIn,
        tokenOut,
        amountOutBigInt.toBigInt(),
        this.wallet,
      );
    } catch (error) {
      this.logger.error(`Error when finding best swap path: ${error}`);
      throw error;
    }
  }

  // v2RoutingExactInput: (tokenIn: string, tokenOut: string, tokenInAmount: bigint)
  async v2RoutingExactInput(
    tokenIn: string,
    tokenInDecimal: string,
    tokenOut: string,
    amountIn: string,
  ) {
    await this.ensureProviderReady();
    // convert amountIn to bigint
    const amountInBigInt: ethers.BigNumber = ethers.utils.parseUnits(
      amountIn,
      tokenInDecimal,
    );

    try {
      return await v2RoutingExactInput(
        tokenIn,
        tokenOut,
        amountInBigInt.toBigInt(),
      );
    } catch (error) {
      this.logger.error(`Error when finding best swap path: ${error}`);
      throw error;
    }
  }

  // v2RoutingExactOutput: (tokenIn: string, tokenOut: string, tokenOutAmount: bigint)
  async v2RoutingExactOutput(
    tokenIn: string,
    tokenInDecimal: string,
    tokenOut: string,
    amountOut: string,
  ) {
    await this.ensureProviderReady();
    // convert amountIn to bigint
    const amountOutBigInt: ethers.BigNumber = ethers.utils.parseUnits(
      amountOut,
      tokenInDecimal,
    );

    try {
      return await v2RoutingExactOutput(
        tokenIn,
        tokenOut,
        amountOutBigInt.toBigInt(),
      );
    } catch (error) {
      this.logger.error(`Error when finding best swap path: ${error}`);
      throw error;
    }
  }

  // v3RoutingExactInput: (tokenIn: string, tokenOut: string, tokenInAmount: bigint, signer: ethers.Signer)
  async v3RoutingExactInput(
    tokenIn: string,
    tokenInDecimal: string,
    tokenOut: string,
    amountIn: string,
  ) {
    await this.ensureProviderReady();
    // convert amountIn to bigint
    const amountInBigInt: ethers.BigNumber = ethers.utils.parseUnits(
      amountIn,
      tokenInDecimal,
    );

    try {
      return await v3RoutingExactInput(
        tokenIn,
        tokenOut,
        amountInBigInt.toBigInt(),
        this.wallet,
      );
    } catch (error) {
      this.logger.error(`Error when finding best swap path: ${error}`);
      throw error;
    }
  }

  // v3RoutingExactOutput: (tokenIn: string, tokenOut: string, tokenOutAmount: bigint, signer: ethers.Signer)
  async v3RoutingExactOutput(
    tokenIn: string,
    tokenInDecimal: string,
    tokenOut: string,
    amountOut: string,
  ) {
    await this.ensureProviderReady();
    // convert amountIn to bigint
    const amountOutBigInt: ethers.BigNumber = ethers.utils.parseUnits(
      amountOut,
      tokenInDecimal,
    );

    try {
      return await v3RoutingExactOutput(
        tokenIn,
        tokenOut,
        amountOutBigInt.toBigInt(),
        this.wallet,
      );
    } catch (error) {
      this.logger.error(`Error when finding best swap path: ${error}`);
      throw error;
    }
  }

  /**
   * Approve tokens for the router
   */
  async routerTokenApproval(
    token1Address: string,
    token1Decimal: string,
    amount1: string,
    bestRoute: string[],
  ): Promise<any> {
    await this.ensureProviderReady();
    // convert amountIn to bigint
    const amount1BigInt: ethers.BigNumber = ethers.utils.parseUnits(
      amount1,
      token1Decimal,
    );

    try {
      return await routerTokenApproval(
        token1Address,
        amount1BigInt.toBigInt(),
        bestRoute,
        this.wallet,
      );
    } catch (error) {
      this.logger.error(`Error when approving tokens: ${error}`);
      throw error;
    }
  }

  // const v2GetPrice = (token1, token2) => __awaiter(void 0, void 0, void 0, function* () {
  /**
   * Get the price of the tokens using v2
   */
  async getPiperxV2Price(tokenIn: string, tokenOut: string) {
    await this.ensureProviderReady();
    try {
      return await v2GetPrice(tokenIn, tokenOut);
    } catch (error) {
      this.logger.error(`Error when getting price: ${error}`);
      throw error;
    }
  }

  /**
   * Get the price of the tokens using v2 with decimals
   * export declare const v2GetPriceWithDecimals: (token1: string, token2: string, decimal1: number, decimal2: number) => Promise<number>;
   */
  async getPiperxV2PriceWithDecimals(
    tokenIn: string,
    tokenOut: string,
    tokenInDecimal: number,
    tokenOutDecimal: number,
  ) {
    await this.ensureProviderReady();
    try {
      return await v2GetPriceWithDecimals(
        tokenIn,
        tokenOut,
        tokenInDecimal,
        tokenOutDecimal,
      );
    } catch (error) {
      this.logger.error(`Error when getting price with decimals: ${error}`);
      throw error;
    }
  }

  /**
   * Get the price of the tokens using v2 with decimals
   * export declare const v3GetPriceWithDecimals: (token1: string, token2: string, decimal1: number, decimal2: number, fee?: number) => Promise<number>;
   */
  async getPiperxV3PriceWithDecimals(
    tokenIn: string,
    tokenOut: string,
    tokenInDecimal: number,
    tokenOutDecimal: number,
    fee: number,
  ) {
    await this.ensureProviderReady();
    try {
      return await v3GetPriceWithDecimals(
        tokenIn,
        tokenOut,
        tokenInDecimal,
        tokenOutDecimal,
        fee,
      );
    } catch (error) {
      this.logger.error(`Error when getting price with decimals: ${error}`);
      throw error;
    }
  }
}
