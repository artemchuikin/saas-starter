import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as cookieParser from 'cookie-parser';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get<ConfigService>(ConfigService);
    const port = configService.get<string>('port');
    app.setGlobalPrefix('api/v1');
    app.enableCors({
        origin: [
            // 'http://localhost:3000',
            // 'http://localhost:3002',
            configService.get<string>('clientUrl')
        ],
        credentials: true
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(port, () => console.log(`!! App listening at ${port} !!`));

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
