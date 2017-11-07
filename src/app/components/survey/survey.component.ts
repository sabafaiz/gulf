import { Component } from '@angular/core';
import { SurveyService } from '../../providers/survey.service';

@Component({
    selector : 'survey',
    templateUrl : 'survey.component.html',
    providers : [SurveyService]
})
export class SurveyComponent{
    isStudent : boolean; 
    constructor(private ss : SurveyService){
        if(localStorage.getItem('loginType') == 'student'){
            this.isStudent = true;
        }
        else{
            this.isStudent = false;
        }
    }
}