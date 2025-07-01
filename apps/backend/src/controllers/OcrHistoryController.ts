import {
  Controller,
  Get,
  Route,
  Tags,
  Request,
  Security,
  Query,
} from "tsoa";
import { OcrService } from "../services/OcrService";
import { AuthenticatedRequest } from "../types";

@Route("ocr_history")
@Tags("OcrHistory")
export class OcrHistoryController extends Controller {
  private ocrService = new OcrService();

  /**
   * 聚合当前用户所有类型的历史记录（OCR + 文案）
   * @param page 页码，默认 1
   * @param pageSize 每页条数，默认 10
   */
  @Security("jwt")
  @Get("")
  public async getAggregatedHistory(
    @Request() req: AuthenticatedRequest,
    @Query() page?: number,
    @Query() pageSize?: number
  ): Promise<any[]> {
    if (!req.user) {
      this.setStatus(401);
      return [];
    }

    const userId = req.user.id;
    const currentPage = page && page > 0 ? page : 1;
    const currentPageSize = pageSize && pageSize > 0 ? pageSize : 10;

    // 拉取各类记录
    const [ocrRecords] = await Promise.all([
      this.ocrService.getRecordsByUser(userId),
    ]);

    // 统一格式化
    const formatted = [
      ...ocrRecords.map((r) => ({
        id: r.id,
        type: r.type, // ocr | document | scan
        source: "ocr",
        imageUrl: r.image_url,
        result: r.result,
        created_at: r.created_at,
      })),
    ];

    // 按时间倒序
    const sorted = formatted.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // 分页
    const start = (currentPage - 1) * currentPageSize;
    const end = start + currentPageSize;
    const paged = sorted.slice(start, end);

    return paged;
  }
}
