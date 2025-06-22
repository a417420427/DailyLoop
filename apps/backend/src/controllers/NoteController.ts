import {
  Controller,
  Route,
  Tags,
  Get,
  Post,
  Put,
  Delete,
  Path,
  Body,
  Query,
  SuccessResponse,
  Response,
} from "tsoa";
import { Note } from "../entities/Note";
import { NoteService } from "../services/NoteService";

interface NoteCreateRequest {
  title?: string;
  content?: string;
}

interface NoteUpdateRequest {
  title?: string;
  content?: string;
}

@Route("notes")
@Tags("Note")
export class NoteController extends Controller {
  private NoteService = new NoteService();

  /**
   * 获取某用户所有笔记（非删除）
   * @param userId 用户ID
   */
  @Get("user/{userId}")
  public async getNotes(@Path() userId: string): Promise<Note[]> {
    return this.NoteService.getNotesByUser(userId);
  }

  /**
   * 获取单条笔记
   * @param id 笔记ID
   */
  @Get("{id}")
  @Response(404, "Note not found")
  public async getNote(@Path() id: string): Promise<Note> {
    const note = await this.NoteService.getNoteById(id);
    if (!note) {
      this.setStatus(404);
      throw new Error("Note not found");
    }
    return note;
  }

  /**
   * 创建新笔记
   * @param userId 用户ID
   * @param request 创建请求体
   */
  @Post("user/{userId}")
  @SuccessResponse("201", "Created")
  public async createNote(
    @Path() userId: string,
    @Body() request: NoteCreateRequest
  ): Promise<Note> {
    this.setStatus(201);
    return this.NoteService.createNote(userId, request.title, request.content);
  }

  /**
   * 更新笔记
   * @param id 笔记ID
   * @param userId 用户ID
   * @param request 更新请求体
   */
  @Put("{id}/user/{userId}")
  @Response(404, "Note not found or user unauthorized")
  public async updateNote(
    @Path() id: string,
    @Path() userId: string,
    @Body() request: NoteUpdateRequest
  ): Promise<Note> {
    const note = await this.NoteService.updateNote(id, userId, request.title, request.content);
    if (!note) {
      this.setStatus(404);
      throw new Error("Note not found or user unauthorized");
    }
    return note;
  }

  /**
   * 软删除笔记
   * @param id 笔记ID
   * @param userId 用户ID
   */
  @Delete("{id}/user/{userId}")
  @Response(404, "Note not found or user unauthorized")
  public async deleteNote(
    @Path() id: string,
    @Path() userId: string
  ): Promise<{ success: boolean }> {
    const success = await this.NoteService.deleteNote(id, userId);
    if (!success) {
      this.setStatus(404);
      throw new Error("Note not found or user unauthorized");
    }
    return { success };
  }
}
