import { Component } from '@angular/core';
import { PollService } from '../../providers/poll.service';
import { Router } from '@angular/router';

declare let $ : any;

@Component({
    selector : 'poll',
    templateUrl : './poll.component.html',
    styleUrls : [ './poll.component.css' ],
    providers : [PollService]
})
export class PollComponent{
    more: boolean = false;
    public isStudent : boolean;
    public pgNo : number = 1;
    public pgNoT : number = 1;
    public polls : any [] = [];
    public isVoting : boolean = false;
    public selectedPoll : any = {} ;
    public vote : any [] = [];
    public message : string;
    isLoader : boolean = false;

    moreLoader : boolean = false;

    constructor( private ps : PollService, private router : Router){
        this.isLoader = true;
        if(localStorage.getItem('loginType')=='student'){
            this.isStudent = true;
            this.router.navigate(['/polls/for-me']);
            // this.getPolls();
        }
        else{
            this.isStudent = false;
            this.getPollsByTeacherCurrent();
        }
    }

    // getPolls(){
    //     this.ps.getPolls(this.pgNo).subscribe( (res : any) => {
    //         this.polls = res;
    //         this.isLoader = false;
    //         console.log(res);
    //     }, (err : any) => {

    //     } )
    // }

    // getPollsByTeacherClosed(){
    //     this.ps.getPollsByTeacherClosed(this.pgNoT).subscribe( (res : any) => {
    //         this.polls = res;
    //         console.log(res);
    //     }, (err : any) => {

    //     } )
    // }

    getPollsByTeacherCurrent(){
        this.ps.getPollsByTeacherCurrent(this.pgNoT).subscribe( (res : any) => {
            this.isLoader = false;
            this.moreLoader = false;
            if(this.pgNoT == 1){
                this.polls = res;
            }
            else{
                this.polls = this.polls.concat(res);
            }
            this.pgNoT += 1; 

            if(res < 6){
                this.more = false;
            }
            else{
                this.more = true;
            }
            console.log(res);
        }, (err : any) => {

        } )
    }

    // openPoll(poll : any){
    //     this.vote = [];
    //     this.selectedPoll = poll;
    //     this.selectedPoll.options[0].percent = 50;
    //     $('#poll').modal('show');
    // }

    // choiceType(){
    //     if(this.selectedPoll.optionTypeName == 'Single Choice'){
    //         return 'radio';
    //     }
    //     else{
    //         return 'checkbox';
    //     }
    // }

    // votes(option : any, toCheck : any){
    //     if(this.selectedPoll.optionTypeName == 'Single Choice'){
    //         this.vote = [];
    //         this.vote.push(option.id);
    //     }
    //     else{
    //         if(toCheck.checked == true){
    //             this.vote.push(option.id);
    //         }
    //         else{
    //             let index = this.vote.indexOf(option.id);
    //             this.vote.splice(index,1);
    //         }
    //     }
    //     console.log(this.vote);
    // }

    // submitPoll(){
    //     console.log(this.vote);
    //     this.ps.submitVote(this.selectedPoll.id,this.vote).subscribe( (res : any) => {
    //         console.log(res);
    //         this.message = res.message;
    //         $("#poll").modal('hide');
    //         $("#message").modal('show');    
    //     }, (err :any) => {

    //     })
    // }
}