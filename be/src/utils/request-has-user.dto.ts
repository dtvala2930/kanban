import { IsNotEmpty } from "class-validator";
import { UserEntity } from "~modules/user/entities/user.entity";

export class RequestHasUserDTO {
  @IsNotEmpty()
  user: UserEntity;
}
