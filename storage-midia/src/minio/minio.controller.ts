import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';
import { Response } from 'express';

// TODO: Gerar URLs assinadas para acessar imagens protegidas.
// TODO: Criar um cron job para limpar arquivos temporários.
// TODO: Otimizar upload para suportar arquivos grandes.
@Controller()
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('bucket-name') bucketName: string,
  ) {
    const url = await this.minioService.uploadFile(file, bucketName);
    return { url };
  }

  @Get()
  async getFile(@Query('url') fileUrl: string, @Res() res: Response) {
    try {
      const fileStream = await this.minioService.getFileStream(fileUrl);

      res.setHeader('Content-Type', fileStream.contentType);
      res.setHeader(
        'Content-Disposition',
        `inline; filename="${fileStream.fileName}"`,
      );

      fileStream.stream.pipe(res);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: 'Erro ao baixar o arquivo',
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Erro ao baixar o arquivo',
          error: 'Tente novamente mais tarde',
        });
      }
    }
  }
}
