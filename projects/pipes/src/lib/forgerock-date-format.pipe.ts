import { Pipe, PipeTransform } from '@angular/core';
import formatDate from 'date-fns/format';
import debug from 'debug';

const log = debug('Pipe:forgerockDateFormat');

@Pipe({
  name: 'forgerockDateFormat',
  pure: false
})
export class DateFormatPipe implements PipeTransform {
  transform(date: string | number | Date, format?: string): string {
    if (!date) {
      throw new Error('dateFormat needs a date');
    }
    try {
      if (typeof date === 'string') {
        return formatDate(new Date(date), format);
      }
      return formatDate(date, format);
    } catch (error) {
      log(error, { date, format });
      return date.toString();
    }
  }
}
