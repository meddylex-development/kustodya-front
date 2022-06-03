import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cie10'
})
export class Cie10Pipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let cied10 = value.split("-")
    let dataReturn;
    if (!args) {
      dataReturn = cied10[1]
    } else {
      if (args == 1) {
        dataReturn = cied10[0]
      } else {
        dataReturn = cied10[1]
      }
    }

    return dataReturn;
  }

}
