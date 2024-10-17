import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import bodyParser from "body-parser";
import { KANBAN_URL, ONLINE_STORAGE_URL } from "~configs/app.config";
import { API_PREFIX_PATH } from "~utils/constants";
import { LoggerService as Logger } from "~utils/logger";
import { AppModule } from "./app.module";

export async function setupMiddleware(app) {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          connectSrc: [
            `'self'`,
            `'unsafe-inline'`,
            `${ONLINE_STORAGE_URL} https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com`,
          ],
          scriptSrc: [`'self'`, `'unsafe-inline'`, "https://*.googletagmanager.com https://tagmanager.google.com"],
          styleSrc: [
            `'self'`,
            `'unsafe-inline'`,
            "https://tagmanager.google.com https://www.googletagmanager.com https://fonts.googleapis.com https://*.googletagmanager.com",
          ],
          imgSrc: [
            `'self'`,
            "data:",
            "https://*.googletagmanager.com https://ssl.gstatic.com https://www.gstatic.com https://*.google-analytics.com",
          ],
          fontSrc: [`'self'`, "data:", "https://fonts.gstatic.com"],
        },
      },
    }),
  );

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  //set up swagger
  const apiPath = `${API_PREFIX_PATH}/docs`;

  // app.use([apiPath]);
  const config = new DocumentBuilder()
    .setTitle("Xypass")
    .setDescription("Xypass project")
    .setVersion("1.0")
    .addBearerAuth({ type: "http", scheme: "bearer", in: "header" }, "token")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(apiPath, app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  app.disable("x-powered-by");

  app.use(bodyParser.json({ limit: "2048mb" }));
  app.use(bodyParser.urlencoded({ limit: "2048mb", extended: true }));

  app.use(compression());
  app.use(cookieParser());

  // Enable CORS
  app.enableCors({
    origin: [KANBAN_URL],
  });

  return app;
}

async function createAppInstance() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"],
  });

  await setupMiddleware(app);

  return app;
}

async function bootstrapLocal() {
  const app = await createAppInstance();
  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
  Logger.log(`Server listens on PORT: ${PORT}`);
}

bootstrapLocal();
