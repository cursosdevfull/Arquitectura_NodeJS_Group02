class Animal {
  private raza: string;
  private color: string;

  constructor(pRaza: string, pColor: string) {
    this.raza = pRaza;
    this.color = pColor;
  }

  public obtenerDescripcion(): string {
    return `Raza: ${this.raza}. Color: ${this.color}`;
  }
}

const animal = new Animal("Pastor alemán", "Beige");

/* console.log("raza", animal.raza)
console.log("color", animal.color) */
console.log("animal", animal);
console.log("descripción", animal.obtenerDescripcion());
