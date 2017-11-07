import { Injectable } from '@angular/core';
import { CustomHttpService } from './customHttp.service';
import { Urls } from './app.constant';

Injectable()
export class SurveyService {
    
    constructor( private http : CustomHttpService, private urls : Urls ) {
        this.accountType();
    }

    accountType() {
        if (localStorage.getItem('loginType') == 'student') {
            return 'st';
        }
        return 'ma';
    }

    fetchSurveysForManagement(isExpired: boolean, pageNo: number) { // made by managment himself
        return this.http.get(this.urls.serverUrl + `/ma/survey/${isExpired}/page/${pageNo}`);
    }
}