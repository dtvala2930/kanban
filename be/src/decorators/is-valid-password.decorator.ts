import { type ValidationArguments, type ValidationOptions, registerDecorator } from "class-validator";
import { PASSWORD_VALID_REGEX } from "~utils/constants";

export function IsValidPassword(validationOptions?: ValidationOptions) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: "IsValidPassword",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        validate(value: any) {
          if (typeof value !== "string") {
            return false;
          }

          const passwordRegex = PASSWORD_VALID_REGEX;
          return passwordRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must contain at least one uppercase letter, one special character, one number, and be at least 8 characters long.`;
        },
      },
    });
  };
}
