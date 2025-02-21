import { Module } from '@nestjs/common';
import { PiperxService } from './piperx.service';
import { PiperxController } from './piperx.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [PiperxController],
  providers: [PiperxService],
  exports: [PiperxService],
})
export class PiperxModule {}
