import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { BusinessException } from "@domain-shared/errors/business.error";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Đã xảy ra lỗi máy chủ nội bộ.";
    let errorCode = "INTERNAL_SERVER_ERROR";
    let details: any = null;

    if (exception instanceof BusinessException) {
      statusCode = exception.statusCode;
      message = exception.message;
      errorCode = exception.code;
      details = exception.details || null;
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === "string") {
        message = res;
      } else if (typeof res === "object" && res !== null) {
        message = (res as any).message || exception.message;
        details = (res as any).error || null;
      }
      errorCode = "HTTP_EXCEPTION";
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(statusCode).json({
      status: "error",
      statusCode,
      message,
      error: {
        code: errorCode,
        details,
      },
      systemName: "VIEBEE_HERITAGE_SERVICE",
      data: null,
    });
  }
}
