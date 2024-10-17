import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { API_PREFIX_PATH } from "~utils/constants";

@Controller()
export class AppController {
  @Get(`${API_PREFIX_PATH}/test`)
  getHello(@Res() res: Response) {
    return res.send("Hello World");
  }
}
