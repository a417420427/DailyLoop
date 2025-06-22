import { AppDataSource } from "../data-source";
import { Note } from "../entities/Note";

export class NoteService {
  private noteRepository = AppDataSource.getRepository(Note);

  async getNotesByUser(userId: string): Promise<Note[]> {
    return this.noteRepository.find({
      where: { user_id: userId, is_deleted: false },
      order: { updated_at: "DESC" },
    });
  }

  async getNoteById(id: string): Promise<Note | null> {
    return this.noteRepository.findOne({
      where: { id, is_deleted: false },
    });
  }

  async createNote(userId: string, title?: string, content?: string): Promise<Note> {
    const note = this.noteRepository.create({
      user_id: userId,
      title,
      content,
      is_deleted: false,
    });
    return this.noteRepository.save(note);
  }

  async updateNote(
    id: string,
    userId: string,
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

  async deleteNote(id: string, userId: string): Promise<boolean> {
    const note = await this.getNoteById(id);
    if (!note || note.user_id !== userId) {
      return false;
    }
    note.is_deleted = true;
    await this.noteRepository.save(note);
    return true;
  }
}
