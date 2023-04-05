import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ampmpipe'
})
export class AmpmpipePipe implements PipeTransform {

  transform(value:string ) {
    // let date = new Date(value);
    //   var hours = date.getHours();
    //   var minutes = date.getMinutes();
    //   var ampm = hours >= 12 ? 'pm' : 'am';
    //   hours = hours % 12;
    //   hours = hours ? hours : 12; // the hour '0' should be '12'
    //   minutes = minutes < 10 ? '0'+minutes : minutes;
    //   var strTime = hours + ':' + minutes + ' ' + ampm;
    //   return strTime;

    var time = new Date(value);
    console.log(
      time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    );
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

}
