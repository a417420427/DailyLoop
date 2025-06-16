// src/services/HabitService.ts
import { AppDataSource } from "../utils/data-source"; // 你的 TypeORM 数据源
import { Habit } from "../entities/Habit";

export class HabitService {
  private habitRepo = AppDataSource.getRepository(Habit);

  async getAll(userId: number): Promise<Habit[]> {
    return this.habitRepo.find({
      where: {
        user: { id: userId }, // ✅ 使用关系字段过滤
      },
      relations: ["user"], // 可选：如果你需要包含 user 信息
      order: { id: "DESC" },
    });
  }

  async getOne(id: number): Promise<Habit | null> {
    return this.habitRepo.findOneBy({ id });
  }

  async create(habit: Partial<Habit>): Promise<Habit> {
    const newHabit = this.habitRepo.create(habit);
    return this.habitRepo.save(newHabit);
  }

  async update(id: number, updates: Partial<Habit>): Promise<Habit | null> {
    const habit = await this.getOne(id);
    if (!habit) return null;
    Object.assign(habit, updates);
    return this.habitRepo.save(habit);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.habitRepo.delete(id);
    return result.affected !== 0;
  }
}
