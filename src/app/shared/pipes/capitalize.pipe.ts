import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let text_capitalize = null
    if(value !== 'undefined' && value !== null) {
      let text_lower_case = value.toLowerCase();
      text_capitalize = text_lower_case.charAt(0).toUpperCase() + text_lower_case.slice(1);
    }
    // let string_convert = value;
    // let nameCapitalized = string_convert.charAt(0).toUpperCase() + string_convert.slice(1);

    return text_capitalize;
  }

}
