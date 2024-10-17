import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthTestService {
  index() {
    console.log("heelo");
  }
}
