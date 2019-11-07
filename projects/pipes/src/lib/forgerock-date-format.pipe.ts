import { Pipe, PipeTransform } from '@angular/core';
import * as format_ from 'date-fns/format';

// https://github.com/jvandemo/generator-angular2-library/issues/221
const formatDate = format_;

@Pipe({
  name: 'forgerockDateFormat',
  pure: false
})
export class DateFormatPipe implements PipeTransform {
  transform(date: string | number | Date, format?: string): string {
    if (!date) {
      throw new Error('dateFormat needs a date');
    }
    return formatDate(date, format);
    5;
  }
}
