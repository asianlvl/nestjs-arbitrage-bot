import { Module } from '@nestjs/common';
import { StoryhuntService } from './storyhunt.service';
import { StoryhuntController } from './storyhunt.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [StoryhuntController],
  providers: [StoryhuntService],
  exports: [StoryhuntService],
})
export class StoryhuntModule {}
