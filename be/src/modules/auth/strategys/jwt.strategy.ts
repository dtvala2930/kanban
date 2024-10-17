import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import express from "express";
import { omit } from "lodash";
import { Strategy } from "passport-jwt";

import { JWT_SECRET_KEY } from "~configs/app.config";
import { UserService } from "~modules/user/user.service";
import { LoggedInterface } from "~utils/interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  private user: LoggedInterface;
  logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: () => "",
      ignoreExpiration: true,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async authenticate(req: express.Request) {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");

      if (!token) {
        return this.fail("login-unauthorized", 401);
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: JWT_SECRET_KEY,
        });

        const userId = payload.accountId;

        const accountDB = await this.userService.getOne({ userId });

        this.user = {
          userId,
          name: accountDB.name,
          email: accountDB.email,
          address: accountDB.address,
          phone: accountDB.phone,
          role: accountDB.role,
        };

        return this.success(omit(this.user), {});
      } catch {
        return this.fail("login-unauthorized", 401);
      }
    } else {
      return this.fail("login-unauthorized", 401);
    }
  }
}
