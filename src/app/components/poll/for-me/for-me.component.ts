import { Component } from '@angular/core';
import { PollService } from '../../../providers/poll.service';
declare let $ : any;

@Component({
    selector : 'for-me',
    templateUrl : 'for-me.component.html',
    styleUrls : ['for-me.component.css'],
    providers : [ PollService ] 
})
export class ForMePollComponent{
    message: any;
    selectedPoll: any = {};
    vote: any[] = [];
    pgNo : number = 1;
    polls : any [] = [];
    isStudent : boolean = false;
    more : boolean = false;
    isLoader : boolean = true;
    constructor( private ps : PollService){
        this.pgNo = 1;
        this.getPolls();
        
        this.isLoader = true;
        if(localStorage.getItem('loginType') == 'student'){
            this.isStudent = true;
        }
        else{
            this.isStudent = false;
        }
    }

    getPolls(){
        this.ps.getPolls(this.pgNo).subscribe( (res:any) => {
            this.polls = res;
            if(res.length < 12){
                this.more = false;
            }
            else{
                this.more = true;
            }
            console.log(res);
            this.isLoader = false;
            this.pgNo++;
        }, (err :any) => {
            this.isLoader = false;
        })
    }

      openPoll(poll : any){
        this.vote = [];
        this.selectedPoll = poll;
        this.selectedPoll.options[0].percent = 50;
        $('#poll').modal('show');
    }

    choiceType(poll:any){
        if(poll.optionTypeName == 'Single Choice'){
            return 'radio';
        }
        else{
            return 'checkbox';
        }
    }

    votes(option : any, toCheck : any){
        if(this.selectedPoll.optionTypeName == 'Single Choice'){
            this.vote = [];
            this.vote.push(option.id);
        }
        else{
            if(toCheck.checked == true){
                this.vote.push(option.id);
            }
            else{
                let index = this.vote.indexOf(option.id);
                this.vote.splice(index,1);
            }
        }
        console.log(this.vote);
    }

    submitPoll(poll:any){
        console.log(this.vote);
        this.ps.submitVote(poll.id,this.vote).subscribe( (res : any) => {
            console.log(res);
            this.message = res.message;
            let index = this.polls.indexOf(poll);
            this.polls.splice(index,1);
            $("#poll").modal('hide');
            $("#message").modal('show');    
        }, (err :any) => {

        })
    }
}