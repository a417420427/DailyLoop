import fs from 'fs'
import TCloud  from "tencentcloud-sdk-nodejs-ocr"

const client = new TCloud.ocr.v20181119.Client({
  credential: {
    secretId: process.env.TENCENT_SECRET_ID,
    secretKey: process.env.TENCENT_SECRET_KEY,
  },
  region: "ap-guangzhou",
  profile: {
    httpProfile: {
      endpoint: "ocr.tencentcloudapi.com",
    },
  },
});

export async function recognizeImage(filePath: string) {
  const base64 = fs.readFileSync(filePath, { encoding: "base64" });
  const result = await client.GeneralBasicOCR({ ImageBase64: base64 });
  return result.TextDetections;
}


