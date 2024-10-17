import { Body, Controller, HttpException, HttpStatus, Logger, Post, Res, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { UserService } from "~modules/user/user.service";
import { API_PREFIX_PATH } from "~utils/constants";
import { parseDateTime } from "~utils/date-time";
import { ResponseSuccessInterface } from "~utils/interfaces";
import { AuthService } from "../auth.service";
import { AuthRegisterDTO } from "../dto/auth-register.dto";

@ApiTags("Auth")
@Controller()
export class AuthRegisterController {
  logger = new Logger(AuthRegisterController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post(`${API_PREFIX_PATH}/auth/register`)
  async register(@Body(ValidationPipe) authRegisterDto: AuthRegisterDTO, @Res() res: Response) {
    const httpStatusCode = HttpStatus.OK;
    const resData: ResponseSuccessInterface = {
      statusCode: httpStatusCode,
      success: "register-success",
      data: null,
    };
    const dateNowTimeZone = parseDateTime();

    try {
      const accountDB = await this.userService.getOne({
        email: authRegisterDto.email,
      });

      if (accountDB) {
        throw new HttpException("Email already taken", HttpStatus.BAD_REQUEST);
      }

      const password = authRegisterDto.password;
      const hashedPassword = this.authService.hashPassword(password);

      await this.userService.create({ userData: authRegisterDto, hashedPassword, dateNowTimeZone });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }

    return res.status(httpStatusCode).json(resData);
  }
}
