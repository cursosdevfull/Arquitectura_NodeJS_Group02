import { Column } from 'typeorm';

export class BaseEntity {
  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
