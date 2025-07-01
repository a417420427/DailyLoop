import dotenv from "dotenv";
import { ocr } from "tencentcloud-sdk-nodejs-ocr";
import { Client } from "tencentcloud-sdk-nodejs-ocr/tencentcloud/services/ocr/v20181119/ocr_client";

const envConfig = dotenv.config().parsed || {};

export class TencentOcrService {
  private secretId = envConfig.TENCENT_SECRET_ID;
  private secretKey = envConfig.TENCENT_SECRET_KEY;
  private client!: Client;

  constructor() {
    const OcrClient = ocr.v20181119.Client;
    this.client = new OcrClient({
      credential: {
        secretId: this.secretId,
        secretKey: this.secretKey,
      },
      region: "ap-guangzhou",
      profile: {
        httpProfile: {
          endpoint: "ocr.tencentcloudapi.com",
        },
      },
    });
  }
  // 图片文字识别接口
  public async recognizeText(imageBase64: string) {
    if (!imageBase64) throw new Error("ImageBase64 is required");

    return this.client.GeneralBasicOCR({
      ImageBase64: imageBase64,
    });
  }

  // 扫码识别接口
  public async scanCode(imageBase64: string) {
    if (!imageBase64) throw new Error("ImageBase64 is required");

    return this.client.QrcodeOCR({
      ImageBase64: imageBase64,
    });
  }

  // 文档结构化抽取接口（示例）
  public async extractDocument(imageBase64: string) {
    if (!imageBase64) throw new Error("ImageBase64 is required");

    return this.client.TableOCR({
      ImageBase64: imageBase64,
    });
  }
}
