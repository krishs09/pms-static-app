import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timepipe'
})
export class TimepipePipe implements PipeTransform {

  transform(dateParam: string) {
    let value = new Date(dateParam);
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

       if (value.getFullYear() == today.getFullYear() && value.getMonth() == today.getMonth() && value.getDate() == today.getDate())
       return "Today";
     else if (value.getFullYear() == yesterday.getFullYear() && value.getMonth() == yesterday.getMonth() && value.getDate() == yesterday.getDate())
       return "Yesterday";
       else if (value.getFullYear() == tomorrow.getFullYear() && value.getMonth() == tomorrow.getMonth() && value.getDate() == tomorrow.getDate())
       return "Tomorrow";
    else{
      return (new DatePipe("en-US")).transform(value, 'dd/MM/yyyy');
    }
 }

}
