import {
  Controller,
  Post,
  Route,
  Tags,
  Body,
  SuccessResponse,
  Request,
} from "tsoa";
import { ChatGPTService } from "../services/ChatGPTService";
import { DeepSeekService } from "../services/DeepSeekService";
import { buildAiPrompt } from "../utils/promptBuilder";
import { User } from "../entities/User";
import { AuthenticatedRequest } from "../types";
import { CopyGenerationHistoryService } from "../services/CopyGenerationHistoryService";

interface GenerateCopyRequest {
  keywords: string[]; // 关键词数组
  style: string; // 风格
  length: "short" | "medium" | "long"; // 文本长度
}

@Route("ai")
@Tags("AI")
export class AIController extends Controller {
  private historyService = new CopyGenerationHistoryService();
  /**
   * 使用 DeepSeek AI 生成文本
   */
  @SuccessResponse("200", "生成成功")
  @Post("deepseek")
  public async deepseek(
    @Body() body: GenerateCopyRequest,
    @Request() req: AuthenticatedRequest
  ): Promise<{ result: string }> {
    const { keywords, style, length } = body;
    const aiPrompt = buildAiPrompt(keywords, style, length);

    try {
      const result = await DeepSeekService.generateText(aiPrompt);

      // 确保 req.user 存在，再保存历史记录
      if (req.user && req.user.id) {
        await this.historyService.createHistory(
          req.user.id,
          keywords,
          style,
          length,
          aiPrompt,
          result
        );
      }

      return { result };
    } catch (err: any) {
      this.setStatus(500);
      return Promise.reject(new Error(err.message || "ChatGPT 服务调用失败"));
    }
  }

  /**
   * 使用 ChatGPT AI 生成文本
   */
  @SuccessResponse("200", "生成成功")
  @Post("chatgpt")
  public async chatgpt(
    @Body() body: { prompt: string }
  ): Promise<{ result: string }> {
    const { prompt } = body;
    try {
      const result = await ChatGPTService.generateText(prompt);
      return { result };
    } catch (error: any) {
      this.setStatus(500);
      return Promise.reject(new Error(error.message || "ChatGPT 服务调用失败"));
    }
  }
}
