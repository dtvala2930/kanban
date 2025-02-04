import { ValidatorConstraint, type ValidatorConstraintInterface } from "class-validator";
import { isUndefined } from "lodash";

import { checkEmailSpam } from "~utils/helpers";

@ValidatorConstraint({ name: "IsMailSpam", async: false })
export class IsMailSpam implements ValidatorConstraintInterface {
  validate(email: string) {
    if (isUndefined(email)) {
      return false;
    }

    const count = checkEmailSpam(email);

    return count === 0;
  }

  defaultMessage() {
    return "email-wrong";
  }
}
