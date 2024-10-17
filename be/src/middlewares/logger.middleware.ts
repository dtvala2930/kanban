import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import morgan from "morgan";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    morgan(
      (tokens, req, res) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const user = (req as any)?.user?.email || "anonymous";
        return JSON.stringify({
          user: user,
          host: tokens["remote-addr"](req, res),
          method: tokens.method(req, res),
          path: tokens.url(req, res),
          duration: +tokens["response-time"](req, res),
          agent: tokens["user-agent"](req, res),
          referrer: tokens.referrer(req, res),
          code: +tokens.status(req, res),
        });
      },
      {
        stream: {
          write: (message: string) => this.logMessage(message),
        },
      },
    )(req, res, next);
  }

  private logMessage(message: string) {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(JSON.parse(message));
  }
}
