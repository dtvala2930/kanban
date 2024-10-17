import { Controller, Get, HttpException, HttpStatus, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { assign } from "lodash";

import { UserService } from "~modules/user/user.service";
import { API_PREFIX_PATH } from "~utils/constants";
import { LoggedInterface, ResponseSuccessInterface } from "~utils/interfaces";
import { RequestHasUserDTO } from "~utils/request-has-user.dto";
import { ServiceGuard } from "../guards";

@ApiTags("Auth")
@UseGuards(AuthGuard("jwt"), ServiceGuard)
@Controller(`${API_PREFIX_PATH}/auth`)
export class AuthProfileController {
  constructor(private readonly userService: UserService) {}
  @ApiBearerAuth("token")
  @ApiResponse({ description: "get-profile-success" })
  @ApiBadRequestResponse({ description: "Unauthorized" })
  @Get("profile")
  async profile(@Req() req: RequestHasUserDTO & Request, @Res() res: Response) {
    let httpStatusCode = HttpStatus.OK;
    const resData: ResponseSuccessInterface = {
      statusCode: httpStatusCode,
      success: "get-profile-success",
      data: null,
    };

    try {
      const { user } = req;
      const userCurrent: Partial<LoggedInterface> = user;

      assign(resData, {
        data: {
          ...userCurrent,
        },
      });
    } catch (error) {
      httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(error.message, httpStatusCode);
    }

    return res.status(httpStatusCode).json(resData);
  }
}
