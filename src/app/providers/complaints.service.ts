import { Injectable } from '@angular/core';
import { CustomHttpService } from './customHttp.service';
import { Urls } from './app.constant';

@Injectable()
export class ComplaintsService{
    
    constructor(private http : CustomHttpService, private url : Urls){
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
        return this.http.get( this.url.serverUrl + `/${this.getType()}/complaint/page/${pageNo}`)
    }

    getCategory(){
        return this.http.get( this.url.serverUrl + `/${this.getType()}/complaint/category`) 
    }

    getFaculty(){
        return this.http.get( this.url.serverUrl + `/${this.getType()}/complaint/faculty/${localStorage.getItem('programId')}/${localStorage.getItem('yearId')}/${localStorage.getItem('isEvenSemester')}`)
    }

    postComplaint(data : any){
        return this.http.post( this.url.serverUrl + `/${this.getType()}/complaint`, data);
    }

    getComplaintById( id : any ){
        return this.http.get( this.url.serverUrl + `/ma/complaint/${id}`);
    }

    getStatus(){
        return this.http.get( this.url.serverUrl + `/${this.getType()}/complaint/filter/status`);
    }

    closeComplaint(id:any, comment: any, rca?:any){
        if(rca){
            let obj = {
                comment,
                rca
            }
            return this.http.put( this.url.serverUrl + `/ma/complaint/${id}/close`, obj);
        }
        else{
            let obj = {
                comment
            }
            return this.http.put( this.url.serverUrl + `/st/complaint/${id}/close`, obj);
        }
    }

    reOpenComplaint(id : any , comment:any){
        let obj = {
            comment
        }
        return this.http.put( this.url.serverUrl + `/st/complaint/${id}/reopen`, obj); 
    }

    satisfyComplaint(id:any){
        return this.http.put( this.url.serverUrl + `/st/complaint/${id}/satisfied`,{});
    }

    editComplaint( id:any, changes:any ){
        return this.http.put( this.url.serverUrl + `/ma/complaint/${id}`,changes);
    }

    getFacultyList(){
        return this.http.get( this.url.serverUrl + '/ma/all');
    }

    getStatusList(){
        return this.http.get( this.url.serverUrl + `/${this.getType()}/complaint/filter/status`);
    }

    getPriorityList(){
        return this.http.get( this.url.serverUrl + `/${this.getType()}/complaint/filter/priority`);
    }
}