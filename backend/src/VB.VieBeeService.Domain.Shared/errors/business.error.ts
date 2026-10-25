import { ErrorCode } from "./error-code.enum";

export class BusinessException extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(code: ErrorCode, message: string, statusCode: number = 400, details?: any) {
    super(message);
    this.name = "BusinessException";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, BusinessException.prototype);
  }

  static notFound(message: string = "Tài nguyên không tồn tại"): BusinessException {
    return new BusinessException(ErrorCode.NOT_FOUND, message, 404);
  }

  static workshopNotFound(id: string): BusinessException {
    return new BusinessException(ErrorCode.WORKSHOP_NOT_FOUND, `Không tìm thấy workshop với ID: ${id}`, 404);
  }

  static slotNotFound(slotId: string): BusinessException {
    return new BusinessException(ErrorCode.SLOT_NOT_FOUND, `Khung giờ ${slotId} không tồn tại hoặc đã bị hủy.`, 404);
  }

  static slotFull(available: number, requested: number): BusinessException {
    return new BusinessException(
      ErrorCode.SLOT_CAPACITY_EXCEEDED,
      `Khung giờ không đủ chỗ. Còn lại: ${available} chỗ, yêu cầu: ${requested} chỗ.`,
      400
    );
  }

  static invalidCredentials(): BusinessException {
    return new BusinessException(ErrorCode.INVALID_CREDENTIALS, "Email hoặc mật khẩu không chính xác.", 401);
  }

  static unauthorized(message: string = "Yêu cầu đăng nhập để thực hiện"): BusinessException {
    return new BusinessException(ErrorCode.UNAUTHORIZED, message, 401);
  }

  static forbidden(message: string = "Bạn không có quyền thực hiện thao tác này"): BusinessException {
    return new BusinessException(ErrorCode.FORBIDDEN, message, 403);
  }
}
