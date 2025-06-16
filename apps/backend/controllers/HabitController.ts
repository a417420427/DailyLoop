import { Controller, Get, Post, Route, Tags, Body, Query, Path } from "tsoa";
import { HabitService } from "../services/HabitService";
import { Habit } from "../entities/Habit";

@Route("habits")
@Tags("Habit")
export class HabitController extends Controller {
  private habitService = new HabitService();

  // 根据 userId 获取所有习惯，userId 用路径参数
  @Get("{userId}")
  public async getHabits(@Path() userId: number): Promise<Habit[]> {
    return this.habitService.getAll(userId);
  }

  // 创建习惯
  @Post()
  public async createHabit(@Body() habit: Habit): Promise<Habit> {
    return this.habitService.create(habit);
  }

  // 如果想用查询参数，可以另写一个方法，路径不用重复
  @Get()
  public async getAll(@Query() userId: number): Promise<Habit[]> {
    return this.habitService.getAll(userId);
  }
}
