import { UserModel } from '../models/user.model';

export interface UserRepository {
  getAll(): Promise<UserModel[]>;
}
