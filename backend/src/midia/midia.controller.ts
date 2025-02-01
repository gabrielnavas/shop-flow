import { Controller, Get, Query, Res } from '@nestjs/common';
import { MidiaService } from './midia.service';
import { Response } from 'express';

@Controller('midia')
export class MidiaController {
  constructor(private readonly midiaService: MidiaService) {}

  @Get()
  async getFile(@Query('url') fileUrl: string, @Res() res: Response) {
    try {
      const fileStream = await this.midiaService.getFileStream(fileUrl);

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
