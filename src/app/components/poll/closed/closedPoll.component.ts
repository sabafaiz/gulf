import { Component } from '@angular/core';
import { PollService } from '../../../providers/poll.service';

@Component({
    selector : 'closed-poll',
    templateUrl : 'closedPoll.component.html',
    styleUrls : ['../poll.component.css'],
    providers : [ PollService ]
})
export class ClosedPollComponent{
    
    pgNo : number = 1;
    polls : any [] = [];
    more : boolean = false;
    isLoader : boolean = false;
    moreLoader : boolean = false;
    constructor( private ps : PollService){
        this.isLoader = true;
        this.getPollsByTeacherClosed();
    }

    getPollsByTeacherClosed(){
        this.ps.getPollsByTeacherClosed(this.pgNo).subscribe( (res : any) => {
            this.isLoader = false;
            this.moreLoader =false;
            if(this.pgNo == 1){
                this.polls = res;
            }
            else{
                this.polls = this.polls.concat(res);
            }
            this.pgNo++;
            if(res.length < 6){
                this.more = false;
            }
            else{
                this.more = true;
            }
            console.log(res);
        }, (err : any) => {

        } )
    }
}