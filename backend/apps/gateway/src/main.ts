import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { errorResponse } from '@app/contracts/helpers/response.helper';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory: (validationErrors = []) => {
                const errors: Record<string, string[]> = {};
                validationErrors.forEach((error) => {
                    errors[error.property] = Object.values(error.constraints || {});
                });

                const formattedError = errorResponse(
                    'Validation Error',
                    'Validation failed',
                    errors,
                );

                return new BadRequestException(formattedError);
            },
        }),
    );

    app.setGlobalPrefix(`/${process.env.API_PATH}/${process.env.API_VERSION}`)

    const port = process.env.APP_PORT || 3001;
    await app.listen(port);
    console.log(`[HTTP Gateway] Listening on: http://localhost:${port}`);
}
bootstrap();
