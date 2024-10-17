import { Injectable } from "@nestjs/common";
import { Command } from "nestjs-command";
import { handleMakeKey } from "~utils/helpers";
import { LoggerService as Logger } from "../utils/logger";

@Injectable()
export class CryptoKeyCommand {
  @Command({
    command: "crypto:random-key",
    describe: "Generate random crypto key",
  })
  async handle() {
    Logger.log("", "===============================================================");
    Logger.log("", "=========CRYPTO=RANDOM=KEY=AND=JWT=SECRET=KEY==================");
    Logger.log("", "===============================================================");
    Logger.log(handleMakeKey(32), "CIPHER_KEY");
    Logger.log(handleMakeKey(16), "CIPHER_IV");
    Logger.log(handleMakeKey(32), "JWT_SECRET_KEY");
    Logger.log("", "===============================================================");
  }
}
