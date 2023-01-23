import { v4 as uuidv4 } from 'uuid';

import { IdVO } from '../value-objects/id.vo';

export class Requeriment {
  readonly id: IdVO;
  readonly description: string;
  readonly active: boolean;

  constructor(description: string) {
    const idVOResult = IdVO.create(uuidv4());
    if (idVOResult.isErr()) {
      throw new Error('Invalid id');
    }

    this.id = idVOResult.value;
    this.description = description;
    this.active = true;
  }
}
