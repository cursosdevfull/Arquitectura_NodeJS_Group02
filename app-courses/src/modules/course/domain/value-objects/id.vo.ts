import { validate } from 'uuid';

import { BaseVO } from '../../../../core/domain/value-objects/base';

export class IdVO extends BaseVO<string> {
  private constructor(value: string) {
    super();
    this.value = value;
  }

  static create(value: string): IdVO {
    if (!validate(value)) {
      throw new Error('Invalid id');
    }
    return new IdVO(value);
  }
}
