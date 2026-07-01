import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter, validationExceptionFactory } from '@app/contracts/helpers/http-exception.filter';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new HttpExceptionFilter());

    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory: validationExceptionFactory,
        }),
    );

    app.setGlobalPrefix(`/${process.env.API_PATH}/${process.env.API_VERSION}`)

    const port = process.env.APP_PORT || 3001;
    await app.listen(port);
    console.log(`[HTTP Gateway] Listening on: http://localhost:${port}`);
}
bootstrap();
