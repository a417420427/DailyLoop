import { AppDataSource } from "../data-source";
import { Note } from "../entities/Note";

export class NoteService {
  private noteRepository = AppDataSource.getRepository(Note);

  async getNotesByUser(userId: number): Promise<Note[]> {
    return this.noteRepository.find({
      where: { user_id: userId, is_deleted: false },
      order: { updated_at: "DESC" },
    });
  }

  async getNoteById(id: number): Promise<Note | null> {
    return this.noteRepository.findOne({
      where: { id, is_deleted: false },
    });
  }

  async createNote(userId: number, title?: string, content?: string): Promise<Note> {
    const note = this.noteRepository.create({
      user_id: userId,
      title,
      content,
      is_deleted: false,
    });
    return this.noteRepository.save(note);
  }

  async updateNote(
    id: number,
    userId: number,
    title?: string,
    content?: string
  ): Promise<Note | null> {
    const note = await this.getNoteById(id);
    if (!note || note.user_id !== userId) {
      return null;
    }
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;

    return this.noteRepository.save(note);
  }

  async deleteNote(id: number, userId: number): Promise<boolean> {
    const note = await this.getNoteById(id);
    if (!note || note.user_id !== userId) {
      return false;
    }
    note.is_deleted = true;
    await this.noteRepository.save(note);
    return true;
  }
}
