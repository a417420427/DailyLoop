import { Get, Post, Route, Tags, Body, Path, SuccessResponse, Controller } from "tsoa";
import { User } from "../entities/User";
import { UserService } from "../services/userService";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  private userService = new UserService();

  /**
   * 根据 ID 获取用户信息
   * @param userId 用户 ID
   */
  @Get("{userId}")
  public async getUserById(@Path() userId: number): Promise<User | null> {
    return await this.userService.findById(userId);
  }

  /**
   * 注册新用户
   * @param requestBody 用户注册信息
   */
  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(
    @Body() requestBody: { phone: string; passwordHash: string; username: string }
  ): Promise<User> {
    const savedUser = await this.userService.createUser(requestBody);
    this.setStatus(201);
    return savedUser;
  }
}
