import { v4 as uuidv4 } from 'uuid';

import { IdVO } from '../value-objects/id.vo';

export class Requeriment {
  readonly id: IdVO;
  readonly description: string;
  readonly active: boolean;

  constructor(description: string) {
    this.id = IdVO.create(uuidv4());
    this.description = description;
    this.active = true;
  }
}
