import {
  Get,
  Post,
  Route,
  Tags,
  Body,
  Path,
  SuccessResponse,
  Controller,
} from "tsoa";
import { UserService } from "../services/userService";
import { User } from "../entities/User";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  private userService = new UserService();

  /**
   * 根据 ID 获取用户信息
   * @param userId 用户 ID
   */
  @Get("{userId}")
  public async getUserById(@Path() userId: number): Promise<Omit<User, "passwordHash"> | null> {
    const user = await this.userService.getUserById(userId);
    if (!user) return null;
    // 返回时去除密码哈希
    const { passwordHash, ...rest } = user;
    return rest;
  }

  /**
   * 注册新用户
   * @param requestBody 用户注册信息
   */
  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(
    @Body()
    requestBody: { phone: string; password: string; username: string; wechatOpenid?: string }
  ): Promise<Omit<User, "passwordHash">> {
    const user = await this.userService.createUser(requestBody);
    this.setStatus(201);
    const { passwordHash, ...rest } = user;
    return rest;
  }

  /**
   * 用户登录（手机号+密码）
   * @param phone 手机号
   * @param password 密码
   */
  @Post("login")
  public async loginUser(
    @Body() body: { phone: string; password: string }
  ): Promise<Omit<User, "passwordHash"> | null> {
    const user = await this.userService.verifyUser(body.phone, body.password);
    if (!user) {
      this.setStatus(401);
      return null;
    }
    const { passwordHash, ...rest } = user;
    return rest;
  }

  /**
   * 微信登录或绑定
   * @param body 包含wechatOpenid和username
   */
  @Post("wechat-login")
  public async wechatLogin(
    @Body() body: { wechatOpenid: string; username: string }
  ): Promise<Omit<User, "passwordHash">> {
    const user = await this.userService.loginOrBindWechat(body.wechatOpenid, body.username);
    const { passwordHash, ...rest } = user;
    return rest;
  }
}
