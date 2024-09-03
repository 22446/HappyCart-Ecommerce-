import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(ValueObj:any[],text:string): any[] {
    return ValueObj.filter((item)=>item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
  }

}
