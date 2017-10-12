import { Injectable } from '@angular/core';
import { CustomHttpService } from './customHttp.service';
import { Urls } from './app.constant';
declare const SockJS : any;
declare const Stomp : any;

@Injectable()
export class ComplaintsService{
    
    constructor(private http : CustomHttpService, private url : Urls){
    }
    private serviceType : string;
    setServiceType(str : string){
        this.serviceType =str;
    }

    getType(){
        var type : string;
        if(localStorage.getItem('loginType') == 'student'){
            type = 'st';
        }
        else{
            type = 'ma';
        }
        return type;
    }
    getComplaints(pageNo){        
        return this.http.get( this.url.serverUrl + `/${this.getType()}/${this.serviceType}/page/${pageNo}`)
    }

    getCategory(){
        return this.http.get( this.url.serverUrl + `/${this.getType()}/${this.serviceType}/category`) 
    }

    getFaculty(){
        return this.http.get( this.url.serverUrl + `/${this.getType()}/${this.serviceType}/faculty/${localStorage.getItem('programId')}/${localStorage.getItem('yearId')}/${localStorage.getItem('isEvenSemester')}`)
    }

    postComplaint(data : any){
        return this.http.post( this.url.serverUrl + `/${this.getType()}/${this.serviceType}`, data);
    }

    getComplaintById( id : any ){
        return this.http.get( this.url.serverUrl + `/ma/${this.serviceType}/${id}`);
    }

    getStatus(){
        return this.http.get( this.url.serverUrl + `/${this.getType()}/${this.serviceType}/filter/status`);
    }

    closeComplaint(id:any, comment: any, rca?:any){
        if(rca){
            let obj = {
                comment,
                rca
            }
            return this.http.put( this.url.serverUrl + `/ma/${this.serviceType}/${id}/close`, obj);
        }
        else{
            let obj = {
                comment
            }
            return this.http.put( this.url.serverUrl + `/st/${this.serviceType}/${id}/close`, obj);
        }
    }

    //Socket
    getSockJs() {
        let access_token = localStorage.getItem('access_token');
        let url = this.url.serverUrl + `/${this.getType()}/nxtlife-websocket?access_token=` + access_token;
        var socket = new SockJS(url);
        return Stomp.over(socket);
    }

    reOpenComplaint(id : any , comment:any){
        let obj = {
            comment
        }
        return this.http.put( this.url.serverUrl + `/st/${this.serviceType}/${id}/reopen`, obj); 
    }

    satisfyComplaint(id:any){
        return this.http.put( this.url.serverUrl + `/st/${this.serviceType}/${id}/satisfied`,{});
    }

    editComplaint( id:any, changes:any ){
        return this.http.put( this.url.serverUrl + `/ma/${this.serviceType}/${id}`,changes);
    }

    getFacultyList(){
        return this.http.get( this.url.serverUrl + '/ma/all');
    }

    getStatusList(){
        return this.http.get( this.url.serverUrl + `/${this.getType()}/${this.serviceType}/filter/status`);
    }

    getPriorityList(){
        return this.http.get( this.url.serverUrl + `/${this.getType()}/${this.serviceType}/filter/priority`);
    }

    getComments(id : any){
        return this.http.get( this.url.serverUrl + `/${this.getType()}/${this.serviceType}/${id}/comment`);
    }

    postComment( id : any, comment : any){
        return this.http.post( this.url.serverUrl + `/${this.getType()}/${this.serviceType}/${id}/comment`,comment);
    }
}