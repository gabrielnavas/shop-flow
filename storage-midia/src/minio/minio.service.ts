import { Injectable } from '@nestjs/common';

import { Client } from 'minio';
import { extname } from 'path';

@Injectable()
export class MinioService {
  private minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.MINIO_END_POINT as string,
      port: Number(process.env.MINIO_PORT),
      useSSL: process.env.MINIO_USESSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY as string,
      secretKey: process.env.MINIO_SECRET_KEY as string,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    bucketName: string,
  ): Promise<string> {
    if (
      !bucketName ||
      typeof bucketName !== 'string' ||
      bucketName.length === 0
    ) {
      throw new Error('missing bucket name');
    }

    // Garante que o bucket existe
    const bucketExists = await this.minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(bucketName, 'us-east-1');
    }

    // Nome único para o arquivo
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;

    // Envia para o MinIO diretamente da memória
    await this.minioClient.putObject(
      bucketName,
      fileName,
      file.buffer,
      file.size,
      { 'Content-Type': file.mimetype },
    );

    // Retorna a URL do arquivo
    return `http://localhost:3001/${bucketName}/${fileName}`;
  }

  async getFileStream(fileUrl: string) {
    const urlObj = new URL(fileUrl);
    const bucketName = urlObj.pathname.split('/')[1]; // "uploads"
    const fileName = urlObj.pathname.split('/')[2]; // "1738155793738-325575308.jpeg"

    const stream = await this.minioClient.getObject(bucketName, fileName);
    const stat = await this.minioClient.statObject(bucketName, fileName);

    const contentType = stat.metaData['content-type'] as string;

    return {
      stream,
      contentType: contentType || 'application/octet-stream',
      fileName,
    };
  }
}
