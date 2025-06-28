import * as dotenv from "dotenv";
import {ocr} from "tencentcloud-sdk-nodejs-ocr";

const config = dotenv.config().parsed!

console.log(ocr.v20181119, 'ocrrrrr')
const client = new ocr.v20181119.Client({
  credential: {
    secretId: config.TENCENT_SECRET_ID!,
    secretKey: config.TENCENT_SECRET_KEY!,
  },
  region: "ap-guangzhou",
  profile: {
    httpProfile: {
      endpoint: "ocr.tencentcloudapi.com",
    },
  },
});

export class ImageAnalysisService {
  async generalOcr(base64: string) {
    return client.GeneralBasicOCR({ ImageBase64: base64 });
  }

  async documentExtract(base64: string) {
    return client.TableOCR({ ImageBase64: base64 });
  }

  async qrcode(base64: string) {
    return client.QrcodeOCR({ ImageBase64: base64 });
  }
}
