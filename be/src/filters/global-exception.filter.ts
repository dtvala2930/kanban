import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";
    console.error(exception);
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    }

    response.status(statusCode).json({
      statusCode: statusCode,
      message: message,
    });
  }
}
