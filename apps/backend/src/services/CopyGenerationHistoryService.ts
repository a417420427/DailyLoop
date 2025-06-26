import { AppDataSource } from "../data-source";
import { CopyGenerationHistory } from "../entities/CopyGenerationHistory";

export class CopyGenerationHistoryService {
  private historyRepository = AppDataSource.getRepository(CopyGenerationHistory);

  /**
   * 分页获取某个用户的生成历史，按创建时间倒序排列
   * @param userId 用户ID
   * @param page 当前页码（从1开始）
   * @param pageSize 每页条数
   */
  async getHistoriesByUserPaged(
    userId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<CopyGenerationHistory[]> {
    return this.historyRepository.find({
      where: { user: { id: userId } },
      order: { created_at: "DESC" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  // 其他方法同之前
  async getHistoryById(id: string, userId: string): Promise<CopyGenerationHistory | null> {
    return this.historyRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  async createHistory(
    userId: string,
    keywords: string[],
    style: string,
    length: "short" | "medium" | "long",
    prompt: string,
    result: string
  ): Promise<CopyGenerationHistory> {
    const history = this.historyRepository.create({
      keywords,
      style,
      length,
      prompt,
      result,
      user: { id: userId } as any,
    });
    return this.historyRepository.save(history);
  }

  async deleteHistory(id: string, userId: string): Promise<boolean> {
    const history = await this.getHistoryById(id, userId);
    if (!history) {
      return false;
    }
    await this.historyRepository.remove(history);
    return true;
  }
}
