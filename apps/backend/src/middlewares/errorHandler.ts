import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  // 先取状态码，如果没有就默认500
  const statusCode = err.statusCode || 500;

  // 返回 JSON 错误信息
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
