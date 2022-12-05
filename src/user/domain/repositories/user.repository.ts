import { User } from '../entities/user';
import { UserModel } from '../models/user.model';

export interface UserRepository {
  getAll(): Promise<UserModel[]>;
  getOne(id: string): Promise<UserModel>;
  insert(user: User): Promise<string>;
  update(id: string, user: User): Promise<string>;
  delete(id: string): Promise<string>;
}
