import {
  Controller,
  Route,
  Tags,
  Post,
  Body,
  SuccessResponse,
} from "tsoa";
import { ImageAnalysisService } from "../services/ImageAnalysisService";


@Route("image-analysis")
@Tags("ImageAnalysis")
export class ImageAnalysisController extends Controller {
  private service = new ImageAnalysisService();

  @Post("ocr")
  @SuccessResponse("200", "识别成功")
  public async recognizeText(@Body() body: { imageBase64: string }) {

    console.log(body.imageBase64, 'ssssssssocrocrss')
    return this.service.generalOcr(body.imageBase64);
  }

  @Post("extract")
  @SuccessResponse("200", "结构抽取成功")
  public async extractDocument(@Body() body: { imageBase64: string }) {
    return this.service.documentExtract(body.imageBase64);
  }

@Post("code")
  @SuccessResponse("200", "扫码成功")
  public async scanCode(@Body() body: { imageBase64: string }) {
    return this.service.qrcode(body.imageBase64);
  }
}
