import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFormat',
  standalone: true
})
export class DataFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
