import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personal'
})
export class PersonalPipe implements PipeTransform {
  transform(value: string) : string{
    return value.split('').reverse().join('');
  }
}
