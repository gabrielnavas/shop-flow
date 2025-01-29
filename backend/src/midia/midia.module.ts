import { Module } from '@nestjs/common';
import { MidiaController } from './midia.controller';
import { MidiaService } from './midia.service';

@Module({
  controllers: [MidiaController],
  providers: [MidiaService],
  exports: [MidiaService],
})
export class MidiaModule {}
