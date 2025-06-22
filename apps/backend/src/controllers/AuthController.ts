import {
  Controller,
  Post,
  Route,
  Tags,
  Body,
  SuccessResponse,
  Res,
} from "tsoa";
import { UserService } from "../services/UserService";
import { signJwt } from "../utils/jwt"; // 你需要有JWT生成逻辑
import { Response } from "express";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
   private userService = new UserService();
  /**
   * 发送验证码
   */
  @SuccessResponse("200", "验证码发送成功")
  @Post("send-code")
  public async sendCode(
    @Body() body: { phone: string }
  ): Promise<{ message: string }> {
    const { phone } = body;

    // 发送验证码（内部有防刷逻辑）
    await UserService.generateAndSendCode(phone);
    return { message: "验证码已发送，请注意查收" };
  }

  /**
   * 验证码登录
   */
  @SuccessResponse("200", "登录成功")
  @Post("login")
  public async login(
    @Body() body: { phone: string; code: string },
    @Res() res: Response
  ): Promise<{ token: string; userId: number; username: string }> {
    const { phone, code } = body;

    const isValidCode = await UserService.verifyCode(phone, code);
    if (!isValidCode) {
      res.status(400);
      return Promise.reject(new Error("验证码错误或已过期"));
    }

    // 校验手机号是否已注册用户
    let user = await this.userService.getUserByPhone(phone);
    if (!user) {
      // 如果用户不存在，可以直接创建（注册）
      user = await this.userService.createUser({
        phone,
        password: Math.random().toString(36).slice(-8), // 随机密码，登录主要靠验证码
        username: `user_${phone.slice(-4)}`, // 简单用户名生成示例
      });
    }

    // 更新登录时间
    user.lastLoginAt = new Date();
    await this.userService.updateUser(user.id, user);

    // 生成 JWT token
    const token = signJwt({ userId: user.id, phone: user.phone }, "30m");

    return { token, userId: user.id, username: user.username };
  }
}
