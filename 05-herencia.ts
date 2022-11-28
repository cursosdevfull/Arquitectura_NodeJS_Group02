class Animal {
  public raza: string;
  public color: string;

  constructor(raza: string, color: string = "melón") {
    this.raza = raza;
    this.color = color;
  }

  public obtenerDescripcion(): string {
    return `Raza: ${this.raza}. Color: ${this.color}`;
  }
}

class Mamifero extends Animal {
  familia: string;

  constructor(raza: string, familia: string) {
    super(raza);
    this.familia = familia;
  }
}

const mamifero = new Mamifero("Chihuagua", "Canino");

console.log(mamifero.raza);
console.log(mamifero.color);
console.log(mamifero.obtenerDescripcion());
