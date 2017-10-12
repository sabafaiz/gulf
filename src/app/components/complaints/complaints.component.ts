import { Component } from '@angular/core';
import { ComplaintsService } from '../../providers/complaints.service';
import { DateFilter } from '../../pipes/date.pipe';

declare let $ : any;
@Component({
    selector : 'complaints',
    templateUrl : './complaints.component.html',
    styleUrls : ['./complaints.component.css'],
    providers : [ ComplaintsService ]
})

export class ComplaintsComponent{
    public complaints : any [] = [];
    public more : boolean = true;
    public isStudent : boolean = true;
    public selectedComplaint : any = {};
    private pgNo : number = 1; 
    public reason : any = '' ;
    public rca : any = '' ; 
    public toclose : boolean = false;
    public toreopen : boolean = false;
    public toedit : boolean = false;
    public message : string = '';
    private index;
    public FacultyList : any [];
    public StatusList : any [];
    public PriorityList : any [];
    public status : boolean = false;
    public faculty : number;
    public priority : number;

    constructor( private cs : ComplaintsService){
        this.getComplaints(this.pgNo);
        if(localStorage.getItem('loginType') == 'student'){
            this.isStudent = true;
        }
        else{
            this.isStudent = false;
        }
    }

    getComplaints(pageNo){
        this.cs.getComplaints(pageNo).subscribe( (res:any ) => {
            console.log(res);
            console.log(typeof(res));
            if(res.length < 12){
                this.more = false;
            }
            this.complaints = this.complaints.concat(res);
        }, (err : any) => {

        })
    }

    moreComplaints(){
        this.pgNo++;
        this.getComplaints(this.pgNo);
    }

    openComplaint( complaint : any, index : number ){
        this.index = index;
        this.toclose = false;
        this.reason = '';
        this.rca = '';
        this.selectedComplaint = complaint;
        console.log(this.selectedComplaint);
        if(!this.isStudent){
            this.cs.getComplaintById(complaint.id).subscribe( (res : any) => {
                $('#showComplaint').modal('show');
                console.log(res);    
            },(err : any) => {
                
            })
        }
        else{
            $('#showComplaint').modal('show');            
        }           
    }

    closeComplaint(){
        if(this.isStudent){
            this.cs.closeComplaint(this.selectedComplaint.id, this.reason).subscribe( (res:any) => {
                this.message = "Complaint Closed Successfully";
                this.complaints[this.index] = res;
                $('#showComplaint').modal('hide');
                $('#success').modal('show');
            }, (err : any) => {
                this.message = err.developerMessage;
                $('#showComplaint').modal('hide');
                $('#success').modal('show');
            })
        }
        else{
            this.cs.closeComplaint(this.selectedComplaint.id, this.reason, this.rca).subscribe( (res:any) => {
                this.message = "Complaint Closed Successfully";
                this.complaints[this.index] = res;
                $('#showComplaint').modal('hide');
                $('.#success').modal('show');
            }, (err : any) => {
                this.message = err.developerMessage;
                $('#showComplaint').modal('hide');
                $('#success').modal('show');
            })
        }   
    }

    reOpenComplaint(){
        this.cs.reOpenComplaint(this.selectedComplaint.id, this.reason).subscribe( (res:any) => {
            this.message = "Complaint ReOpend Successfully";
            this.complaints[this.index] = res;
            $('#showComplaint').modal('hide');
            $('#success').modal('show');
        }, ( err:any ) => {
            this.message = err.developerMessage;
            $('#showComplaint').modal('hide');
            $('#success').modal('show');
        })
    }

    satisfyComplaint(){
        this.cs.satisfyComplaint(this.selectedComplaint.id).subscribe( (res:any) => {
            this.message = "Success";
            this.complaints[this.index] = res;
            $('#showComplaint').modal('hide');
            $('#success').modal('show');
        }, (err :any) => {
            $('#showComplaint').modal('hide');
            $('#success').modal('show');
        })
    }

    getDetails(){
        this.toedit = true;
        this.cs.getFacultyList().subscribe( (res :any) => { 
            this.FacultyList = res;
        }, (err :any) => {

        });
        this.cs.getStatusList().subscribe( (res :any) => { 
            this.StatusList = res;
        }, (err :any) => {

        })
        this.cs.getPriorityList().subscribe( (res :any) => { 
            this.PriorityList = res;
        }, (err :any) => {

        })
    }

}