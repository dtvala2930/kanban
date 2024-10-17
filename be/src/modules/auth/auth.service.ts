import { createCipheriv, createDecipheriv } from "crypto";
import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync, hashSync } from "bcryptjs";

import {
  CIPHER_IV,
  CIPHER_KEY,
  CIPHER_MODE,
  JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN,
  JWT_EXPIRED_TIME_TOKEN,
  JWT_SECRET_KEY,
} from "~configs/app.config";
import { UserService } from "~modules/user/user.service";
import { SALT_ROUNDS } from "~utils/constants";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createTokenAndRefreshToken(accountId: number, expiredTime?: string) {
    const accessToken = await this.jwtService.signAsync({ accountId }, { expiresIn: JWT_EXPIRED_TIME_TOKEN });

    const refreshToken = await this.jwtService.signAsync(
      { accountId },
      {
        secret: JWT_SECRET_KEY,
        expiresIn: expiredTime,
      },
    );

    await this.userService.updateOne(accountId, { refreshToken: refreshToken });

    return { accessToken, refreshToken };
  }

  encodeWithCrypto(text: string) {
    try {
      const cipher = createCipheriv(CIPHER_MODE, CIPHER_KEY, CIPHER_IV);
      const encrypted = cipher.update(text, "utf8", "base64");
      return encrypted + cipher.final("base64");
    } catch (_error) {
      return null;
    }
  }

  decodeWithCrypto(textHash: string) {
    try {
      const decipher = createDecipheriv(CIPHER_MODE, CIPHER_KEY, CIPHER_IV);
      const decrypted = decipher.update(textHash, "base64", "utf8");
      return decrypted + decipher.final("utf8");
    } catch (_error) {
      return null;
    }
  }

  hashPassword(password: string): string {
    const passwordHashWithCrypto = this.encodeWithCrypto(password);
    const passwordHash = hashSync(passwordHashWithCrypto, SALT_ROUNDS);
    return passwordHash;
  }

  comparePassword(password: string, passwordHash: string): boolean {
    const passwordHashWithCrypto = this.encodeWithCrypto(password);
    const comparePass = compareSync(passwordHashWithCrypto, passwordHash);
    return comparePass;
  }

  compareRefreshToken(refreshToken: string, refreshTokenHash: string) {
    const passwordHashWithCrypto = this.encodeWithCrypto(refreshToken);
    const isValidRefreshToken = compareSync(passwordHashWithCrypto, refreshTokenHash);

    if (!isValidRefreshToken) {
      throw new BadRequestException("refresh-token-invalid");
    }

    return isValidRefreshToken;
  }

  async refreshToken(refreshToken: string) {
    try {
      const verify = await this.jwtService.verifyAsync(refreshToken, {
        secret: JWT_SECRET_KEY,
      });

      const checkExistToken = await this.userService.getOne({
        userId: verify.id,
        refreshToken,
      });

      if (checkExistToken) {
        return this.createTokenAndRefreshToken(verify.accountId, JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN);
      }
      throw new HttpException("Refresh token not valid", HttpStatus.BAD_REQUEST);
    } catch (_error) {
      throw new HttpException("Refresh token is not valid", HttpStatus.BAD_REQUEST);
    }
  }

  handleVerifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (_error) {
      throw new HttpException({ statusCode: HttpStatus.UNAUTHORIZED }, HttpStatus.UNAUTHORIZED);
    }
  }
}
