import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { CourseEntity } from './course';

@Entity({ name: 'syllabus' })
export class SyllabusEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne((type) => CourseEntity, (course) => course.syllabus)
  course: CourseEntity;
}
