import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  rpcUrl: process.env.RPC_URL || 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
  privateKey: process.env.PRIVATE_KEY || 'xinchao',
  piperxV2Router: process.env.UNISWAP_V2_ROUTER || '',
  piperxV3Router: process.env.UNISWAP_V3_ROUTER || '',
  storyhuntV2Router: process.env.UNISWAP_V2_ROUTER || '',
  storyhuntV3Router: process.env.UNISWAP_V3_ROUTER || '',
  dbUrl:
    process.env.DATABASE_URL ||
    'postgres://user:password@localhost:5432/arbitrage_db',
}));
