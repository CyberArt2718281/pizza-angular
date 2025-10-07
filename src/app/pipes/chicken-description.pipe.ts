import { Pipe, PipeTransform } from '@angular/core';
import { match } from 'assert'

@Pipe({
  name: 'chickenDescription'
})
export class ChickenDescriptionPipe implements PipeTransform {

  transform(value: string): unknown {
    return value.replace(/([Кк]ур(?:иц|ин|о)[а-я]+)/gm, (match:string)=> match.toUpperCase()); 
  }

}
