import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToMinutes'
})
export class SecondsToMinutesPipe implements PipeTransform {
  transform(value: number): string {
    value = Math.round(value);
    const minutes: number = Math.floor(value / 60);
    return (
      minutes.toString().padStart(2, '0') +
      ':' +
      (value - minutes * 60).toString().padStart(2, '0')
    );
  }
}
