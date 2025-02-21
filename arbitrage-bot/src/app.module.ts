import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PiperxModule } from './modules/piperx/piperx.module';
import { AppConfigModule } from './config/config.module';
import { StoryhuntModule } from './modules/storyhunt/storyhunt.module';
import { ArbitrageModule } from './modules/arbitrage/arbitrage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load biến môi trường từ .env
    AppConfigModule,
    PiperxModule,
    StoryhuntModule,
    ArbitrageModule,
  ],
})
export class AppModule {}
