import { Component } from '@angular/core';
import { AppreciationService } from '../../providers/appreciation.service';

@Component({
    selector : 'appreciation',
    templateUrl : 'appreciation.component.html',
    styleUrls : ['appreciation.component.css'],
    providers : [AppreciationService]
})
export class AppreciationComponent{
    pgNo : number = 1;
    appreciations : any [] = [];
    isMore:boolean = false; 
    isByYou : boolean;
    isLoader : boolean = false;
    constructor(private ap : AppreciationService){
        this.isLoader = true;
        if(document.URL.indexOf('by-you') > 0){
            this.isByYou = true;
            console.log('by-you');
            this.getAppreciationBy();
        }
        else{
            this.isByYou = false;
            console.log('for-you');
            this.getAppreciationFor();
        }
        this.pgNo = 1;
    }

    getAppreciationBy(){
        this.ap.getAppreciationBy().subscribe( (res:any) => {
            console.log(res);
            this.isLoader = false;
            if(this.pgNo==1){
                this.appreciations = res;
            }
            else{
                this.appreciations = this.appreciations.concat(res);
            }
            this.pgNo++;
            if(res.length < 12){
                this.isMore = false;
            }
            else{
                this.isMore = true;
            }
        }, (err : any) => {

        })
    }

    getAppreciationFor(){
        this.ap.getAppreciationFor(this.pgNo).subscribe( (res:any) => {
            console.log(res);
            this.isLoader = false;
            if(this.pgNo==1){
                this.appreciations = res;
            }
            else{
                this.appreciations = this.appreciations.concat(res);
            }
            this.pgNo++;
            if(res.length < 12){
                this.isMore = false;
            }
            else{
                this.isMore = true;
            }
        }, (err:any) => {

        })
    }
}