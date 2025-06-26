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

interface GenerateProductTitlesRequest {
  productName: string;
  productPoints: string;
  targetAudience?: string;
  platform: "淘宝" | "拼多多" | "京东";
  tone: "官方" | "亲切" | "潮流";
}

interface EmbedHotWordsRequest {
  titles: string[];
  keyPoints: string[];
}

interface GenerateDetailPageCopyRequest {
  productFeatures: string;
  keyPoints: string;
}

interface GenerateCopyRequest {
  keywords: string[]; // 关键词数组
  style: string; // 风格
  length: "short" | "medium" | "long"; // 文本长度
}
interface ExtractKeyPointsRequest {
  description: string;
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

  @SuccessResponse("200", "生成成功")
  @Post("generate-product-titles")
  public async generateProductTitles(
    @Body() body: GenerateProductTitlesRequest,
    @Request() req: AuthenticatedRequest
  ): Promise<{ result: string }> {
    const { productName, productPoints, targetAudience, platform, tone } = body;

    try {
      const result = await DeepSeekService.generateProductTitles({
        productName,
        productPoints,
        targetAudience,
        platform,
        tone,
      });

      // 保存历史，确保用户存在
      if (req.user && req.user.id) {
        // await this.historyService.createHistory(
        //   req.user.id,
        //   JSON.stringify(body),
        //   platform,
        //   tone,
        //   `生成商品标题，商品名称：${productName}`,
        //   result
        // );
      }

      return { result };
    } catch (err: any) {
      this.setStatus(500);
      return Promise.reject(new Error(err.message || "DeepSeek 服务调用失败"));
    }
  }

  @SuccessResponse("200", "提炼成功")
  @Post("extract-key-points")
  public async extractKeyPoints(
    @Body() body: ExtractKeyPointsRequest,
    @Request() req: AuthenticatedRequest
  ): Promise<{ keyPoints: string }> {
    const { description } = body;

    try {
      const keyPoints = await DeepSeekService.extractKeyPoints(description);

      if (req.user && req.user.id) {
        // await this.historyService.createHistory(
        //   req.user.id,
        //   description,
        //   "卖点提炼",
        //   "",
        //   "自动提炼关键卖点",
        //   keyPoints
        // );
      }

      return { keyPoints };
    } catch (err: any) {
      this.setStatus(500);
      return Promise.reject(new Error(err.message || "DeepSeek 服务调用失败"));
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

  @SuccessResponse("200", "生成成功")
  @Post("generate-detail-page-copy")
  public async generateDetailPageCopy(
    @Body() body: GenerateDetailPageCopyRequest,
    @Request() req: AuthenticatedRequest
  ): Promise<{ detailCopy: string }> {
    const { productFeatures, keyPoints } = body;

    try {
      const detailCopy = await DeepSeekService.generateDetailPageCopy({
        productFeatures,
        keyPoints,
      });

      // if (req.user && req.user.id) {
      //   await this.historyService.createHistory(
      //     req.user.id,
      //     JSON.stringify(body),
      //     "详情页文案生成",
      //     "",
      //     "生成详情页主文案",
      //     detailCopy
      //   );
      // }

      return { detailCopy };
    } catch (err: any) {
      this.setStatus(500);
      return Promise.reject(new Error(err.message || "DeepSeek 服务调用失败"));
    }
  }

  @SuccessResponse("200", "嵌入成功")
  @Post("embed-hot-words")
  public async embedHotWords(
    @Body() body: EmbedHotWordsRequest,
    @Request() req: AuthenticatedRequest
  ): Promise<{ titles: string[]; keyPoints: string[] }> {
    const { titles, keyPoints } = body;

    try {
      const result = await DeepSeekService.embedHotWords({ titles, keyPoints });

      // if (req.user && req.user.id) {
      //   await this.historyService.createHistory(
      //     req.user.id,
      //     JSON.stringify(body),
      //     "关键词嵌入",
      //     "",
      //     "自动嵌入电商热词",
      //     JSON.stringify(result)
      //   );
      // }

      return result;
    } catch (err: any) {
      this.setStatus(500);
      return Promise.reject(new Error(err.message || "DeepSeek 服务调用失败"));
    }
  }
}
