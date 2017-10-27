import { Injectable } from '@angular/core';
import { CustomHttpService } from './customHttp.service';
import { Urls } from './app.constant';

@Injectable()
export class PollService{

    private isFaculty : string;
    constructor( private http : CustomHttpService, private urls : Urls ){
        this.getType();
        this.isFaculty =  localStorage.getItem('faculty');
    }

    getType(){
        if(localStorage.getItem('loginType') == 'student'){
            return 'st';
        }
        else return 'ma';
    }

    getAudience(){
       return this.http.get( this.urls.serverUrl + '/ma/poll/save-info');
    }

    getDepartments(){
        return this.http.get( this.urls.serverUrl + '/ma/poll/audience/department');
    }

    getPrograms(){
        return this.http.get( this.urls.serverUrl + '/ma/poll/audience/program');
    }

    getProgramYears(){
        return this.http.get( this.urls.serverUrl + '/ma/poll/audience/program/year');
    }

    getYearsForModules(){
        return this.http.get( this.urls.serverUrl + `/ma/poll/audience/module/year/${this.isFaculty}`);
    }

    getModulesByYear(yearId:any){
        return this.http.get( this.urls.serverUrl + `/ma/poll/audience/module/${yearId}/${this.isFaculty}`);
    }

    addPoll(data){
        return this.http.post( this.urls.serverUrl + `/ma/poll`,data);
    }

    getPolls(pgNo){
        return this.http.get( this.urls.serverUrl + `/${this.getType()}/poll/page/${pgNo}`);
    }

    getPollsByTeacherClosed(pgNo){
        return this.http.get( this.urls.serverUrl + `/${this.getType()}/poll/true/page/${pgNo}`);
    }

    getPollsByTeacherCurrent(pgNo){
        return this.http.get( this.urls.serverUrl + `/${this.getType()}/poll/false/page/${pgNo}`);
    }

    submitVote(id,data){
        return this.http.post( this.urls.serverUrl + `/${this.getType()}/poll/${id}`, data);
    }

}