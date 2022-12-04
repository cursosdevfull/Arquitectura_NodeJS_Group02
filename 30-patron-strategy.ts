type STATE_BOOK = "NEW" | "GOOD" | "REGULAR";

interface IBook {
  id: number;
  title: string;
  state: STATE_BOOK;
  isAvailable: boolean;
}

class Stock {
  private static list: IBook[] = [
    { id: 1, title: "NodeJS", state: "NEW", isAvailable: true },
    { id: 2, title: "NodeJS", state: "NEW", isAvailable: true },
    { id: 3, title: "NodeJS", state: "GOOD", isAvailable: true },
    { id: 4, title: "NodeJS", state: "REGULAR", isAvailable: true },

    { id: 5, title: "Angular", state: "NEW", isAvailable: true },
    { id: 6, title: "Angular", state: "NEW", isAvailable: true },
    { id: 7, title: "Angular", state: "NEW", isAvailable: true },
    { id: 8, title: "Angular", state: "REGULAR", isAvailable: true },

    { id: 9, title: "Typescript", state: "NEW", isAvailable: true },
    { id: 10, title: "Typescript", state: "GOOD", isAvailable: true },
    { id: 11, title: "Typescript", state: "GOOD", isAvailable: true },
    { id: 12, title: "Typescript", state: "GOOD", isAvailable: true },
  ];

  static getBooks(): IBook[] {
    return this.list;
  }
}

abstract class SearchBook {
  listBooks: IBook[];

  constructor() {
    this.listBooks = Stock.getBooks();
  }

  updateAvailability(id: number, available: boolean) {
    const bookMatched = this.listBooks.find((book) => book.id === id) as IBook;
    bookMatched.isAvailable = available;
  }

  findByType(title: string, ...states: STATE_BOOK[]) {
    let position = 0;
    let book: IBook | undefined;

    while (position < states.length) {
      book = this.listBooks.find(
        (book) =>
          book.state === states[position] &&
          book.title === title &&
          book.isAvailable
      );
      position++;
      if (book) {
        break;
      }
    }

    if (book) {
      this.updateAvailability(book.id, false);
    }

    return book;
  }

  abstract findBook(title: string): IBook;
}

class Partner extends SearchBook {
  findBook(title: string): IBook {
    return this.findByType(title, "NEW", "GOOD", "REGULAR") as IBook;
  }
}

class Teacher extends SearchBook {
  findBook(title: string): IBook {
    return this.findByType(title, "GOOD", "NEW", "REGULAR") as IBook;
  }
}

class Student extends SearchBook {
  findBook(title: string): IBook {
    return this.findByType(title, "REGULAR", "GOOD", "NEW") as IBook;
  }
}

class Strategy {
  findBookByRole(entity: SearchBook, title: string) {
    return entity.findBook(title);
  }
}

const partner = new Partner();
const teacher = new Teacher();
const student = new Student();

const strategy = new Strategy();

const book1: IBook = strategy.findBookByRole(partner, "NodeJS");
console.log(book1);
const book2: IBook = strategy.findBookByRole(partner, "NodeJS");
console.log(book2);
const book3: IBook = strategy.findBookByRole(student, "NodeJS");
console.log(book3);
