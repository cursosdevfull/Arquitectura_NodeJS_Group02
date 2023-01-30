import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users: Record<string, any> = [
    { id: 1, name: 'jhon.doe', password: '123456' },
    { id: 2, name: 'jane.doe', password: '123456' },
    { id: 3, name: 'john.smith', password: '123456' },
    { id: 4, name: 'jane.smith', password: '123456' },
  ];

  async findOne(username: string): Promise<any> {
    return this.users.find((user) => user.name === username);
  }
}
