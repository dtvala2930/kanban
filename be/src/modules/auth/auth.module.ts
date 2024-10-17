import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JWT_EXPIRED_TIME_TOKEN, JWT_SECRET_KEY } from "~configs/app.config";
import { UserModule } from "~modules/user/user.module";
import { AuthService } from "./auth.service";
import { AuthLoginController } from "./controllers/auth-login.controller";
import { AuthProfileController } from "./controllers/auth-profile.controller";
import { AuthRegisterController } from "./controllers/auth-register.controller";
import { JwtAuthGuard } from "./guards";
import { JwtStrategy } from "./strategys";

@Module({
  controllers: [AuthLoginController, AuthProfileController, AuthRegisterController],
  providers: [JwtStrategy, JwtAuthGuard, AuthService],
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: JWT_EXPIRED_TIME_TOKEN },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
