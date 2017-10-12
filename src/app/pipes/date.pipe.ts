import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name : 'datefilter'
})
export class DateFilter implements PipeTransform {
    transform(value:string){
        var index = value.indexOf('T');
        value = value.substr(0,index);
        return value;
    }
}