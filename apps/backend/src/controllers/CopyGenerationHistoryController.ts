import {
  Controller,
  Get,
  Route,
  Tags,
  Query,
  Request,
  Security,
} from "tsoa";
import { CopyGenerationHistoryService } from "../services/CopyGenerationHistoryService";
import { AuthenticatedRequest } from "../types"; // 你定义的扩展 Request 类型

@Route("copy-history")
@Tags("CopyGenerationHistory")
export class CopyGenerationHistoryController extends Controller {
  private historyService = new CopyGenerationHistoryService();

  /**
   * 获取当前用户的文案生成历史（分页）
   * @param page 页码（默认1）
   * @param pageSize 每页条数（默认10）
   */
  @Security("jwt") // 假设用 jwt 认证装饰器
  @Get()
  public async getUserHistories(
    @Request() req: AuthenticatedRequest,
    @Query() page?: number,
    @Query() pageSize?: number
  ) {
    if (!req.user) {
      this.setStatus(401);
      return { message: "未认证" };
    }

    const currentPage = page && page > 0 ? page : 1;
    const currentPageSize = pageSize && pageSize > 0 ? pageSize : 10;

    const histories = await this.historyService.getHistoriesByUserPaged(
      req.user.id,
      currentPage,
      currentPageSize
    );

    return histories;
  }
}
