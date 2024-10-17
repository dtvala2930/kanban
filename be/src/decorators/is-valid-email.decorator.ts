import { type ValidationArguments, type ValidationOptions, registerDecorator } from "class-validator";
import { EMAIL_REGEX } from "~utils/constants";

export function IsValidEmail(validationOptions?: ValidationOptions) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: "isValidEmail",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        validate(value: any) {
          if (typeof value !== "string") {
            return false;
          }

          const emailRegex = EMAIL_REGEX;
          return emailRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid email address.`;
        },
      },
    });
  };
}
