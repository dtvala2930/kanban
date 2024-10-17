import { Injectable, Logger, Scope } from "@nestjs/common";
import { formatDateToString } from "./date-time";

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
  context: string;

  constructor(context?: string) {
    super(context);
    if (context) {
      this.context = context;
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  public error(message: any, trace?: string, context?: string) {
    if (context) {
      this.context = context;
    }
    console.error(
      `${formatDateToString(new Date())}:`,
      `${this.context ? ` ${this.context}` : ""}`,
      `${trace ? trace : ""}`,
      JSON.stringify(message),
    );
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  public warn(message: any, context?: string) {
    if (context) {
      this.context = context;
    }
    console.warn(
      `${formatDateToString(new Date())}:`,
      `${this.context ? ` ${this.context}` : ""}`,
      JSON.stringify(message),
    );
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  public log(message: any, context?: string) {
    if (context) {
      this.context = context;
    }
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(
      `${formatDateToString(new Date())}:`,
      `${this.context ? ` ${this.context}` : ""}`,
      JSON.stringify(message),
    );
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  static error(message: any, trace?: string, context?: string) {
    console.error(
      `${formatDateToString(new Date())}:`,
      `${context ? ` ${context}` : ""}`,
      `${trace ? trace : ""}`,
      JSON.stringify(message),
    );
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  static warn(message: any, context?: string) {
    console.warn(`${formatDateToString(new Date())}:`, `${context ? ` ${context}` : ""}`, JSON.stringify(message));
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  static log(message: any, context?: string) {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(`${formatDateToString(new Date())}:`, `${context ? ` ${context}` : ""}`, JSON.stringify(message));
  }
}
