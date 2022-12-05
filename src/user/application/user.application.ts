import { Inject } from '@nestjs/common';

import { User } from '../domain/entities/user';
import { UserModel } from '../domain/models/user.model';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserInfrastructure } from '../infrastructure/user.infrastructure';

export class UserApplication {
  constructor(
    @Inject(UserInfrastructure) private userRepository: UserRepository,
  ) {}

  async getAll(): Promise<UserModel[]> {
    return await this.userRepository.getAll();
  }

  async add(user: User) {
    return await this.userRepository.insert(user);
  }
}
