import { Controller, Get, Route, Tags } from "tsoa";

@Route("habits")
@Tags("Habit")
export class HabitController extends Controller {
  @Get("/")
  public async getAll(): Promise<string[]> {
    return ["阅读", "健身", "早起"];
  }
}
