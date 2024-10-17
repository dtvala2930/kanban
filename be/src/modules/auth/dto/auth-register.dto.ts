import { IsEmail, IsNotEmpty, NotContains } from "class-validator";

import { IsValidEmail } from "~decorators/is-valid-email.decorator";
import { IsValidPassword } from "~decorators/is-valid-password.decorator";
import { ROLE } from "~modules/user/constants";

export class AuthRegisterDTO {
  @IsNotEmpty({ message: "id-empty" })
  @IsValidEmail({ message: "invalid-email" })
  @NotContains(" ")
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: "name-empty" })
  name: string;

  @IsNotEmpty({ message: "phone-empty" })
  @NotContains(" ")
  phone: string;

  @IsNotEmpty({ message: "password-empty" })
  @IsValidPassword({ message: "invalid-password" })
  @NotContains(" ")
  password: string;

  @IsNotEmpty({ message: "addreess-empty" })
  address: string;

  @IsNotEmpty({ message: "role-empty" })
  role: ROLE;
}
