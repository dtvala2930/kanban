import { MiddlewareConsumer, Module, type NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "db/data-source";
import { GlobalExceptionsFilter } from "~filters/global-exception.filter";
import { AuthModule } from "~modules/auth/auth.module";
import { THROTTLE_LIMIT, THROTTLE_TTL } from "~utils/constants";
import { AppController } from "./app.controller";
import { LoggerMiddleware, NoXPoweredByMiddleware, SecureHeaderMiddleware } from "./middlewares";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: THROTTLE_TTL, limit: THROTTLE_LIMIT }],
    }),
    AuthModule,
    // UserModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NoXPoweredByMiddleware).forRoutes("*");
    consumer.apply(LoggerMiddleware).forRoutes("*");
    consumer.apply(SecureHeaderMiddleware).forRoutes("*");
  }
}
