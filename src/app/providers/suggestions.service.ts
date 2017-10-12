import { Injectable } from '@angular/core';
import { CustomHttpService } from './customHttp.service';
import { Urls } from './app.constant';

Injectable()
export class SuggestionsService{
    constructor(private urls : Urls, private http : CustomHttpService){
    }
    getSuggestions(){
        return this.http.get("");
    }
}









