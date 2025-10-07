import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'wordUpper',
})
export class WordUpperPipe implements PipeTransform {
  transform(value: string, wordArray:string[]): string {

    let result = value;
    wordArray.forEach((part) => {
      if (part && part.trim()) {
        const regex = new RegExp('[А-Яа-я]*' + part + '[а-я]*', 'gi');

        result = result.replace(regex, (match: string) => {
          return match.toUpperCase();
        });
      }
    });
    return result;
  }
}
