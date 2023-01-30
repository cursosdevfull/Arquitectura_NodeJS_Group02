import { AggregateRoot } from '@nestjs/cqrs';

import { Goal, Requeriment, Syllabus } from '../entities';
import { CourseDeleted } from '../events/CourseDeleted';
import { IdVO } from '../value-objects/id.vo';

export interface CourseEssentials {
  readonly id: IdVO;
  readonly name: string;
}

export interface CourseOptionals {
  readonly goals: Goal[];
  readonly requeriments: Requeriment[];
  readonly syllabus: Syllabus[];
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;
  readonly active: boolean;
}

export type CourseProperties = CourseEssentials & Partial<CourseOptionals>;

export type CourseUpdate = Partial<{
  readonly name: string;
  readonly goals: Goal[];
  readonly requeriments: Requeriment[];
  readonly syllabus: Syllabus[];
}>;

export class Course extends AggregateRoot {
  private readonly id: IdVO;
  private name: string;
  private active: boolean;
  private goals: Goal[];
  private requeriments: Requeriment[];
  private syllabus: Syllabus[];
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(properties: CourseProperties) {
    super();
    Object.assign(this, properties);
    this.active = true;
    this.createdAt = new Date();
  }

  properties(): CourseProperties {
    return {
      id: this.id,
      name: this.name,
      goals: this.goals,
      requeriments: this.requeriments,
      syllabus: this.syllabus,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      active: this.active,
    };
  }

  update(properties: CourseUpdate): void {
    Object.assign(this, properties);
    this.updatedAt = new Date();
  }

  delete(): void {
    this.active = false;
    this.deletedAt = new Date();

    const values = {
      ...this.properties(),
      id: this.properties().id.getValue(),
    };
    this.apply(Object.assign(new CourseDeleted(), values));
  }
}
