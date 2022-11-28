function getUser(query: string): string {
  return query;
}

function getUserById(id: number): number {
  return id;
}

function getUserDB<T>(parameter: T): T {
  return parameter;
}

const user: string = getUserDB<string>("{name: 'Lorena'}");

const userId: number = getUserDB<number>(10);
