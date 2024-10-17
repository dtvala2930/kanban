import { Module } from "@nestjs/common";
import { CommandModule } from "nestjs-command";
import { CryptoKeyCommand } from "./crypto-key.command";

@Module({
  imports: [CommandModule],
  providers: [CryptoKeyCommand],
})
export class AppCommandModule {}
