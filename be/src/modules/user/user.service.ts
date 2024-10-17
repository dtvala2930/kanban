import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { assign } from "lodash";
import { FindOptionsWhere, Repository } from "typeorm";
import { AuthRegisterDTO } from "~modules/auth/dto/auth-register.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async getOne({
    email,
    userId,
    refreshToken,
  }: { email?: string; userId?: number; refreshToken?: string }): Promise<UserEntity> {
    const whereOptions: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[] = {};

    if (email) {
      whereOptions.email = email;
    }

    if (userId) {
      whereOptions.userId = userId;
    }

    if (refreshToken) {
      whereOptions.refreshToken = refreshToken;
    }

    if (!(email || userId || refreshToken)) {
      throw new Error("Not given enough information");
    }

    return this.userRepository.findOne({ where: whereOptions });
  }

  async updateOne(userId: number, newData: Partial<UserEntity>): Promise<UserEntity> {
    const userToUpdate = await this.getOne({ userId });

    if (!userToUpdate) {
      throw new Error("User not found");
    }

    const updatedUser = await this.userRepository.save({
      ...userToUpdate,
      ...newData,
    });

    return updatedUser;
  }

  async create({
    userData,
    hashedPassword,
    dateNowTimeZone,
  }: { userData: AuthRegisterDTO; hashedPassword: string; dateNowTimeZone: Date }): Promise<UserEntity> {
    const payload: Partial<UserEntity> = {};

    assign(payload, userData);
    payload.password = hashedPassword;
    payload.createdAt = dateNowTimeZone;
    payload.updatedAt = dateNowTimeZone;

    const newUser = this.userRepository.create(payload);
    return this.userRepository.save(newUser);
  }
}
