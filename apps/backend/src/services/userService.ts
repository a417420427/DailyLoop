import { getRepository } from "typeorm";
import { User } from "../entities/User";

export class UserService {
  private userRepo = getRepository(User);

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { phone } });
  }

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  // 其他用户相关的业务逻辑
}
