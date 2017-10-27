import { Injectable } from '@angular/core';
import { Urls } from './app.constant';
import { CustomHttpService } from './customHttp.service';

@Injectable()
export class AppreciationService{
    constructor( private urls : Urls, private http :  CustomHttpService){

    }

    getType(){
        if(localStorage.getItem('loginType') == 'student'){
            return 'st';
        }
        return 'ma';
    }

    getAppreciationBy(){
        return this.http.get( this.urls.serverUrl + `/${this.getType()}/appreciation`);
    }

    getAppreciationFor(pgNo){
        return this.http.get( this.urls.serverUrl + `/${this.getType()}/appreciation/for${this.getType() == 'ma' ? 'Faculty' : 'Student'}/page/${pgNo}`)
    }

    getFaultyList(){
        return this.http.get( this.urls.serverUrl + `/st/appreciation/faculty/${localStorage.getItem('programId')}/${localStorage.getItem('yearId')}/${localStorage.getItem('isEvenSemester')}`)
    }

    getYears(){
        return this.http.get( this.urls.serverUrl + `/ma/appreciation/year/${localStorage.getItem('faculty')}`);
    }

    getModules(yrId){
        return this.http.get( this.urls.serverUrl + `/ma/appreciation/module/${yrId}/${localStorage.getItem('faculty')}`);
    }

    getStudents(yrId,modId){
        return this.http.get( this.urls.serverUrl + `/ma/appreciation/students/${modId}/${yrId}`);
    }

    submit(data){
        return this.http.post(this .urls.serverUrl + `/${this.getType()}/appreciation`,data);
    }

}