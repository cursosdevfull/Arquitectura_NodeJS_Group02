import { err, ok, Result } from 'neverthrow';

import { DomainException } from '../exceptions/domain';
import { GoalEmptyDescriptionException, GoalInvalidQuantityItemsException } from '../exceptions/goal.exception';
import { NameEmptyException, NameInvalidWordsException, NameLengthException } from '../exceptions/name.exception';
import {
  RequerimentEmptyDescriptionException,
  RequerimentInvalidQuantityItemsException,
} from '../exceptions/requeriment.exception';
import { SyllabusEmptyDescriptionException, SyllabusInvalidQuantityItemsException } from '../exceptions/syllabus.exception';
import { Course, CourseProperties } from './course';

export type CourseCreateResult = Result<Course, DomainException>;

export class CourseFactory {
  static create(properties: CourseProperties): CourseCreateResult {
    if (properties.goals && properties.goals.length < 3) {
      return err(
        new GoalInvalidQuantityItemsException(properties.goals.length),
      );
    }

    if (properties.goals && properties.goals.length > 0) {
      properties.goals.forEach((goal) => {
        if (!goal.description || !goal.description.trim()) {
          return err(new GoalEmptyDescriptionException());
        }
      });
    }

    if (properties.requeriments && properties.requeriments.length < 3) {
      return err(
        new RequerimentInvalidQuantityItemsException(
          properties.requeriments.length,
        ),
      );
    }

    if (properties.requeriments && properties.requeriments.length > 0) {
      properties.requeriments.forEach((requeriment) => {
        if (!requeriment.description || !requeriment.description.trim()) {
          return err(new RequerimentEmptyDescriptionException());
        }
      });
    }

    if (properties.syllabus && properties.syllabus.length < 3) {
      return err(
        new SyllabusInvalidQuantityItemsException(properties.syllabus.length),
      );
    }

    if (properties.syllabus && properties.syllabus.length > 0) {
      properties.syllabus.forEach((syllabus) => {
        if (!syllabus.description || !syllabus.description.trim()) {
          return err(new SyllabusEmptyDescriptionException());
        }
      });
    }

    if (properties.name.trim() === '') {
      return err(new NameEmptyException());
    } else if (properties.name.length < 10) {
      return err(new NameLengthException(properties.name.length));
    } else if (properties.name.split(' ').length < 2) {
      return err(
        new NameInvalidWordsException(properties.name.split(' ').length),
      );
    }

    return ok(new Course(properties));
  }
}
