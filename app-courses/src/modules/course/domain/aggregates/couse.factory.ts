import { Course, CourseProperties } from './course';

export class CourseFactory {
  static create(properties: CourseProperties) {
    if (properties.goals && properties.goals.length < 3) {
      throw new Error('You must provide at least three goals');
    }

    if (properties.goals && properties.goals.length > 0) {
      properties.goals.forEach((goal) => {
        if (!goal.description || !goal.description.trim()) {
          throw new Error('You must provide a description for each goal');
        }
      });
    }

    if (properties.requeriments && properties.requeriments.length < 3) {
      throw new Error('You must provide at least three requeriments');
    }

    if (properties.requeriments && properties.requeriments.length > 0) {
      properties.requeriments.forEach((requeriment) => {
        if (!requeriment.description || !requeriment.description.trim()) {
          throw new Error(
            'You must provide a description for each requeriment',
          );
        }
      });
    }

    if (properties.syllabus && properties.syllabus.length < 3) {
      throw new Error('You must provide at least three syllabus');
    }

    if (properties.syllabus && properties.syllabus.length > 0) {
      properties.syllabus.forEach((syllabus) => {
        if (!syllabus.description || !syllabus.description.trim()) {
          throw new Error('You must provide a description for each syllabus');
        }
      });
    }

    if (properties.name.trim() === '') {
      throw new Error('You must provide a name');
    } else if (properties.name.length < 10) {
      throw new Error('The name must have at least 10 characters');
    } else if (properties.name.split(' ').length < 2) {
      throw new Error('The name must have at least 2 words');
    }

    return new Course(properties);
  }
}
