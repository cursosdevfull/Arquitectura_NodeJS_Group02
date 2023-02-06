import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { BaseEntity } from '../../../../core/infrastructure/entities/base';
import { GoalEntity } from './goal';
import { RequerimentEntity } from './requeriment';
import { SyllabusEntity } from './syllabus';

@Entity({ name: 'course' })
export class CourseEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany((type) => GoalEntity, (goal) => goal.course, {
    cascade: true,
    eager: true,
  })
  goals: GoalEntity[];

  @OneToMany((type) => RequerimentEntity, (requeriment) => requeriment.course, {
    cascade: true,
    eager: true,
  })
  requeriments: RequerimentEntity[];

  @OneToMany((type) => SyllabusEntity, (syllabus) => syllabus.course, {
    cascade: true,
    eager: true,
  })
  syllabus: SyllabusEntity[];
}
