import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

interface Brand {
  id: string;
  name: string;
}

export const AppErrorCodes = {
  // General errors
  UNSPECIFIED_ERROR: "UNSPECIFIED_ERROR",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  NOT_FOUND: "NOT_FOUND",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
  INVALID_REQUEST_PARAMS: "INVALID_REQUEST_PARAMS",

  // Authentication and authorization errors
  UNAUTHORIZED_ERROR: "UNAUTHORIZED_ERROR",

  // Brand-related errors
  BRAND_NOT_FOUND: "BRAND_NOT_FOUND",

  // Billing and payment errors
  BILLING_ERROR: "BILLING_ERROR",
  PAYMENT_REQUIRED: "PAYMENT_REQUIRED",

  // Paystack-specific errors
  PAYSTACK_INITIALIZATION_ERROR: "PAYSTACK_INITIALIZATION_ERROR",
  PAYSTACK_WEBHOOK_ERROR: "PAYSTACK_WEBHOOK_ERROR",

  // Argil-specific errors
  ARGIL_WEBHOOK_ERROR: "ARGIL_WEBHOOK_ERROR",

  // Video-related errors
  VIDEO_CREATION_JOB_NOT_FOUND: "VIDEO_CREATION_JOB_NOT_FOUND",
  VIDEO_CREATION_JOB_MISSING_OPERATION_ID:
    "VIDEO_CREATION_JOB_MISSING_OPERATION_ID",
  VIDEO_CREATION_JOB_PAYMENT_NOT_FOUND: "VIDEO_CREATION_JOB_PAYMENT_NOT_FOUND",
  VIDEO_CREATION_JOB_PAYMENT_AMOUNT_MISMATCH:
    "VIDEO_CREATION_JOB_PAYMENT_AMOUNT_MISMATCH",
  VIDEO_AVATAR_NOT_FOUND: "VIDEO_AVATAR_NOT_FOUND",
  VIDEO_VOICE_NOT_FOUND: "VIDEO_VOICE_NOT_FOUND",
  INVALID_VIDEO_DIMENSION: "INVALID_VIDEO_DIMENSION",

  // System errors
  CRON_ERROR: "CRON_ERROR",
  TRANSCRIPTION_ERROR: "TRANSCRIPTION_ERROR"
};

export class AppError extends Error {
  statusCode: number;
  errorCode: keyof typeof AppErrorCodes;
  errorMessageLog: string;

  constructor({
    message,
    statusCode,
    errorCode,
    brand
  }: {
    message: string | ZodError;
    statusCode?: number;
    errorCode?: keyof typeof AppErrorCodes;
    brand?: Partial<Pick<Brand, "id" | "name">>;
  }) {
    let errorMessage: string;
    let errorStatusCode: number;

    if (message instanceof ZodError) {
      errorMessage = message.errors
        .map((e) => {
          if (e.message.toLowerCase() === "required" && e.path) {
            return `${e.path.join(",")} is required`;
          }
          return e.message;
        })
        .join(", ");
      errorStatusCode = StatusCodes.BAD_REQUEST;
    } else {
      errorMessage = message;
      errorStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    errorStatusCode = statusCode || errorStatusCode;

    super(errorMessage);
    this.statusCode = errorStatusCode;
    this.errorCode = (
      errorCode || AppErrorCodes.UNSPECIFIED_ERROR
    ).toUpperCase() as keyof typeof AppErrorCodes;
    if (brand?.id || brand?.name) {
      this.errorMessageLog = `[${this.errorCode}] brand=${brand.id}${brand?.name ? `[${brand.name}]` : ""} message=${errorMessage}`;
    } else {
      this.errorMessageLog = `[${this.errorCode}] message=${errorMessage}`;
    }
    // Maintain proper stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  static createDefaultError(brand?: Partial<Brand>): AppError {
    const errorCode: keyof typeof AppErrorCodes = "UNSPECIFIED_ERROR";
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return new AppError({
      message: "Internal server error",
      statusCode,
      errorCode,
      brand
    });
  }
}
