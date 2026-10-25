export interface ErrorResultDto {
  code?: string | null;
  message: string;
  details?: unknown;
}

export interface BaseResultDto {
  status: "success" | "error";
  error: ErrorResultDto | null;
  statusCode: number;
  message: string;
  systemName: string;
}

export interface ApiResult<T> extends BaseResultDto {
  data: T;
}
