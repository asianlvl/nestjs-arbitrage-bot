import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Bật CORS để hỗ trợ frontend
  app.enableCors();

  // Thiết lập global prefix (nếu cần)
  app.setGlobalPrefix('api');

  // Lắng nghe cổng từ biến môi trường, mặc định là 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`🚀 Server đang chạy tại: http://localhost:${port}`);
}
void bootstrap();
