import { Controller, Logger, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { ServiceGuard } from "~modules/auth/guards";
import { API_PREFIX_PATH } from "~utils/constants";

import { UserService } from "./user.service";

@UseGuards(AuthGuard("jwt"), ServiceGuard)
// @ApiTags("User")
@Controller(`${API_PREFIX_PATH}/user`)
export class UserController {
  logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  // @ApiResponse({ status: 200, description: "OK" })
  // @ApiResponse({ status: 404, description: "Cannot GET..." })
}
