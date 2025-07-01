import { AppDataSource } from "../data-source";
import { OcrRecord } from "../entities/OcrRecords";
import { UserService } from "./UserService";


export class OcrService {
  private ocrRepository = AppDataSource.getRepository(OcrRecord);
  private userServie = new UserService();
  // 获取用户的全部 OCR 记录，按时间倒序
  async getRecordsByUser(userId: string): Promise<OcrRecord[]> {
    return this.ocrRepository.find({
      where: { user_id: userId },
      order: { created_at: "DESC" },
    });
  }

  // 获取某一条 OCR 记录
  async getRecordById(id: string): Promise<OcrRecord | null> {
    return this.ocrRepository.findOne({ where: { id } });
  }

  // 创建新的 OCR 记录
  async createRecord(params: {
    userId: string;
    type: "ocr" | "document" | "scan";
    imageUrl?: string;
    result: any;
    imageWidth?: number;
    imageHeight?: number;
  }): Promise<OcrRecord> {
    const user = await this.userServie.getUserById(params.userId);
    const record = this.ocrRepository.create({
      user_id: params.userId,
      type: params.type,
      image_url: params.imageUrl,
      result: params.result,
      imageWidth: params.imageWidth,
      imageHeight: params.imageHeight
    });
    return this.ocrRepository.save(record);
  }

  // 删除一条记录（真正删除，可改为软删除）
  async deleteRecord(id: string, userId: string): Promise<boolean> {
    const record = await this.getRecordById(id);
    if (!record || record.user_id !== userId) {
      return false;
    }
    await this.ocrRepository.remove(record);
    return true;
  }
}
