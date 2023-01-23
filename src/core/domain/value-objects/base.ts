export abstract class BaseVO<TypeValue> {
  protected value: TypeValue;
  getValue(): TypeValue {
    return this.value;
  }
}
