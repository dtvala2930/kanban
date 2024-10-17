import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { CommandModule, CommandService } from "nestjs-command";

import { AppCommandModule } from "./command/app-command.module";
import { LoggerService as Logger } from "./utils/logger";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppCommandModule, {
    logger: ["error", "warn", "log"],
  });

  try {
    await app.select(CommandModule).get(CommandService).exec();
    await app.close();
  } catch (error) {
    Logger.error(error);
    await app.close();
    process.exit(1);
  }
}
bootstrap();
