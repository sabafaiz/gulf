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
    public isOpen : boolean = false;
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
    public priority : string = '';
    public comments : any []=[];
    public comment :string ='';

    constructor( private cs : ComplaintsService){
        this.cs.setServiceType('complaint');
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
        this.isOpen = false;
        this.index = index;
        this.toclose = false;
        this.reason = '';
        this.rca = '';
        this.selectedComplaint = complaint;
        console.log(this.selectedComplaint);
        if(!this.isStudent){
            this.cs.getComplaintById(complaint.id).subscribe( (res : any) => {
                this.selectedComplaint = res;
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
                $('#success').modal('show');
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
            console.log(this.PriorityList);
        }, (err :any) => {

        })
    }

    editComplaint(){

        let obj = {}
        if(this.priority){
            obj['priority'] = this.priority;
        }
        if(this.status){
            obj['statusId'] = 3;
        }
        if(this.faculty){
            obj['assignedTo'] = this.faculty;
        }
        this.cs.editComplaint(this.selectedComplaint.id,obj).subscribe( (res : any) => {
            this.complaints[this.index] = res;
            this.message = "Edit Successfully";
            $('#showComplaint').modal('hide');
            $('#success').modal('show');
        }, (err : any) => {
            this.message = err.developerMessage;
            $('#showComplaint').modal('hide');
            $('#success').modal('show');
        })
    }

    openComments(){
        
        this.isOpen = true;
        $('#showComplaint').modal('hide');
        this.cs.getComments(this.selectedComplaint.id).subscribe( (res:any) => {
            console.log(res);
            this.comments = res;
        }, (err : any) => {
        })
        this.sockJsConnection();
    }

    sockJsConnection() {
        let stompClient = this.cs.getSockJs();
        var type : string;
        if(this.isStudent){
            type = 'st';
        }
        else{
            type = 'ma';
        }
        console.log("12222");
        console.log(this.complaints);
        let url = `/${type}/complaint/${this.selectedComplaint.id}/comment`;
        let url1 = `/${type}/complaint/${this.selectedComplaint.id}/close`;
        let that = this;
        stompClient.connect({},  (frame : any ) => {
            console.log("12222");
            console.log(this.complaints);
        stompClient.subscribe(url,  (greeting : any) => {
        let message = JSON.parse(greeting.body);
        if (!message) {
          return;
        }
        if (!this.comments) {
          this.comments = [];
        }
          this.comments.push(message);
        });
        stompClient.subscribe(url1, (complaint : any) => {
            let comp = JSON.parse(complaint.body);
            this.selectedComplaint = comp;
            console.log(this.complaints);
            this.complaints[this.index] = this.selectedComplaint; 
        })
        });
    }

    sendComment(){
        let comment = {
            comment : this.comment
        }
        if(this.comment != ''){
            this.cs.postComment(this.selectedComplaint.id, comment).subscribe( (res:any) => {
                this.comments.push(res);
                this.comment = '';
            }, (err : any) => {
    
            })
        }
    }
}