import { Body, Controller, HttpException, HttpStatus, Logger, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { assign } from "lodash";

import { ApiTags } from "@nestjs/swagger";
import { JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN } from "~configs/app.config";
import { UserService } from "~modules/user/user.service";
import { API_PREFIX_PATH } from "~utils/constants";
import { ResponseSuccessInterface } from "~utils/interfaces";
import { AuthService } from "../auth.service";
import { AuthLoginDTO } from "../dto";

@ApiTags("Auth")
@Controller()
export class AuthLoginController {
  logger = new Logger(AuthLoginController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post(`${API_PREFIX_PATH}/auth/login`)
  async loginLocal(@Body() authLoginDto: AuthLoginDTO, @Res() res: Response) {
    const resData: ResponseSuccessInterface = {
      statusCode: HttpStatus.OK,
      success: "login-success",
      data: null,
    };

    try {
      const accountDB = await this.userService.getOne({
        email: authLoginDto.email,
      });

      if (accountDB === null) {
        throw new HttpException("login-unauthorized", HttpStatus.UNAUTHORIZED);
      }

      const { password } = accountDB;
      const checkPassword = this.authService.comparePassword(authLoginDto.password, password);

      if (!checkPassword) {
        throw new HttpException("login-unauthorized", HttpStatus.UNAUTHORIZED);
      }

      const { accessToken: token } = await this.authService.createTokenAndRefreshToken(
        accountDB.userId,
        JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN,
      );

      const { exp: expires } = await this.authService.handleVerifyToken(token);

      assign(resData, {
        data: { token, expires },
      });
    } catch (error) {
      this.logger.error(JSON.stringify(error, null, 4));
      throw new HttpException(error.message, error.status);
    }

    return res.status(HttpStatus.OK).json(resData);
  }
}
