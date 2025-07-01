import {
  Controller,
  Route,
  Tags,
  Post,
  Body,
  Request,
  Security,
  SuccessResponse,
  Response,
  UploadedFile,
} from "tsoa";

import { OcrService } from "../services/OcrService";
import { AuthenticatedRequest } from "../types"; // 你的扩展类型
import { TencentOcrService } from "../services/tencentOcrService";
import { TencentCosFileService } from "../services/TencentCosFileService";
import sharp from "sharp";

@Route("ocr")
@Tags("OCR")
export class OcrController extends Controller {
  private ocrService = new OcrService();
  private tencentOcr = new TencentOcrService();

  /**
   * 通用文字识别（含历史记录）
   */
  @Security("jwt")
  @Post("recognize-text")
  @SuccessResponse("200", "Text recognized")
  @Response("400", "Missing imageBase64")
  public async recognizeText(
    @Request() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File
  ): Promise<any> {
    if (!file) {
      this.setStatus(400);
      throw new Error("No image file uploaded");
    }

    const metadata = await sharp(file.buffer).metadata();
    const width = metadata.width;
    const height = metadata.height;

    const base64 = file.buffer.toString("base64");
    const result = await this.tencentOcr.recognizeText(base64);
    const fileService = new TencentCosFileService();
    const uploaded = await fileService.saveUploadedFile(
      file,
      req.user!.userId!
    );
    const conf = {
      imageUrl: uploaded.url, // 存入数据库
      result,
      imageWidth: width,
      imageHeight: height,
    };
    await this.ocrService.createRecord({
      ...conf,
      userId: req.user!.userId!,
      type: "ocr",
    });

    return conf;
  }

  /**
   * 扫码识别（含历史记录）
   */
  @Security("jwt")
  @Post("scan-code")
  public async scanCode(
    @Request() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File
  ): Promise<any> {
     if (!file) {
      this.setStatus(400);
      throw new Error("No image file uploaded");
    }

    const metadata = await sharp(file.buffer).metadata();
    const width = metadata.width;
    const height = metadata.height;

    const base64 = file.buffer.toString("base64");
    const result = await this.tencentOcr.scanCode(base64);
    const fileService = new TencentCosFileService();
    const uploaded = await fileService.saveUploadedFile(
      file,
      req.user!.userId!
    );
    const conf = {
      imageUrl: uploaded.url, // 存入数据库
      result,
      imageWidth: width,
      imageHeight: height,
    };
    await this.ocrService.createRecord({
      ...conf,
      userId: req.user!.userId!,
      type: "ocr",
    });

    return conf;
  }

  /**
   * 文档结构化识别（含历史记录）
   */
  @Security("jwt")
  @Post("extract-document")
  public async extractDocument(
    @Request() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File
  ): Promise<any> {
     if (!file) {
      this.setStatus(400);
      throw new Error("No image file uploaded");
    }

    const metadata = await sharp(file.buffer).metadata();
    const width = metadata.width;
    const height = metadata.height;

    const base64 = file.buffer.toString("base64");
    const result = await this.tencentOcr.extractDocument(base64);
    const fileService = new TencentCosFileService();
    const uploaded = await fileService.saveUploadedFile(
      file,
      req.user!.userId!
    );
    const conf = {
      imageUrl: uploaded.url, // 存入数据库
      result,
      imageWidth: width,
      imageHeight: height,
    };
    await this.ocrService.createRecord({
      ...conf,
      userId: req.user!.userId!,
      type: "ocr",
    });

    return conf;
  }
}
