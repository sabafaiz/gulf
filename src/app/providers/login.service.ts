import { Injectable } from '@angular/core';
import { Urls } from './app.constant';
import { CustomHttpService } from './customHttp.service';
@Injectable()
export class LoginService {
    constructor(public url : Urls, public http:CustomHttpService){
    }
    verifyUser(data:any){
        return this.http.post(this.url.serverUrl + `/oauth/token?grant_type=password&username=${data.username}&password=${data.password}`,{})
    }
    getUserData(type : string){
        console.log(type);
        return this.http.get(this.url.serverUrl + `/${type}/info`);
    }
    setUserData(data : any){
        console.log(data);
        localStorage.setItem('contactNo', data.contactNo);
        localStorage.setItem('email', data.email);
        localStorage.setItem('id', data.id);
        localStorage.setItem('name', data.name);
        localStorage.setItem('nickName', data.nickName);
        localStorage.setItem('picOriginalName', data.picOriginalName);
        localStorage.setItem('picUrl', data.picUrl);
        localStorage.setItem('username', data.username);

        if(localStorage.getItem('loginType') === 'student'){
            localStorage.setItem('isEvenSemester', data.isEvenSemester);
            localStorage.setItem('programId', data.programId);
            localStorage.setItem('programName', data.programName);
            localStorage.setItem('sessionEnd', data.sessionEnd);
            localStorage.setItem('sessionStart', data.sessionStart);
            localStorage.setItem('yearId', data.yearId);
            localStorage.setItem('yearName', data.yearName);
        }
        else{
            localStorage.setItem('faculty', data.faculty);
            localStorage.setItem('roles', data.roles);
        }
        
    }
}