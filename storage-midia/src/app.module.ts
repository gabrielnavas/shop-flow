import { Module } from '@nestjs/common';
import { MinioModule } from './minio/minio.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), MinioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
