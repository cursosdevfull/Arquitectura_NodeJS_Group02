class Database {
  static protocol: string = "http://";

  static getConnectionString(host: string, username: string, password: string) {
    return `${this.protocol}${host}/${username}:${password}`;
  }
}

/* const database = new Database()
console.log(database.getConnectionString("localhost","user01", "password01")) */

console.log(Database.getConnectionString("localhost", "user01", "password01"));
