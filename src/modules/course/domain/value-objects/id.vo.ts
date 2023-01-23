import { err, ok, Result } from 'neverthrow';
import { validate } from 'uuid';

import { BaseVO } from '../../../../core/domain/value-objects/base';
import { IdVOInvalidException } from '../exceptions/id.exception';

export type IdVOResult = Result<IdVO, IdVOInvalidException>;

export class IdVO extends BaseVO<string> {
  private constructor(value: string) {
    super();
    this.value = value;
  }

  static create(value: string): IdVOResult {
    if (!validate(value)) {
      return err(new IdVOInvalidException(value));
    }
    return ok(new IdVO(value));
  }
}
