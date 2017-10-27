import { Component } from '@angular/core';
import { ComplaintsService } from '../../providers/complaints.service';


declare let $ : any;
@Component({
    selector : 'complaints',
    templateUrl : './complaints.component.html',
    styleUrls : ['./complaints.component.css'],
    providers : [ ComplaintsService ]
})

export class ComplaintsComponent{
    sorting: boolean = false;
    public complaints : any [] = [];
    public complaintsCopy : any [] = [];
    public filteredComplaintsCopy : any [] = [];
    public more : boolean = false;
    public isStudent : boolean = true;
    public selectedComplaint : any = {};
    private pgNo : number = 1;
    private pgNoS : number = 1; 
    private pgNoF : number = 1;
    private pgNoFS : number = 1;
    private pgNoSort : number = 1;
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
    public faculty : number = null;
    public priority : string = '';
    public comments : any []=[];
    public comment :string ='';
    private searching : boolean = false;
    private searchString : any = '';
    public filterBy : string = '';
    public filtering:boolean = false;
    public filterType : any = '';
    public category : any [] = [];
    public filterShow : string = '';
    public sortBy : string = '';
    private filterCate : string;
    private filterSearching : boolean = false;

    moreLoader : boolean = false;
    isComplaint : boolean = false;
    isLoader : boolean = true;

    constructor( private cs : ComplaintsService){

        this.searching = false; 
        console.log(document.URL);
        if((document.URL).indexOf('suggestion') >= 0){
            this.cs.setServiceType('suggestion');
            this.isComplaint = false;    
        }
        else{
            this.isComplaint = true;
            this.cs.setServiceType('complaint');
        }
        
        this.getCategory();
        this.getComplaints(this.pgNo);
        this.getDetails();
        if(localStorage.getItem('loginType') == 'student'){
            this.isStudent = true;
        }
        else{
            this.isStudent = false;
        }
    }


    getCategory(){
        this.cs.getCategory().subscribe( (res:any) => {
            
            this.category = res;
            console.log(res);
        }, (err : any) => {

        })
    }

    getComplaints(pageNo){
        this.cs.getComplaints(pageNo).subscribe( (res:any ) => {
            this.isLoader = false;
            this.moreLoader = false;
            console.log(res);
            console.log(typeof(res));
            if(res.length < 12){
                this.more = false;
            }
            else{
                this.more = true;
            }
            if(pageNo == 1){
                this.complaintsCopy = res;
            }
            this.complaints = this.complaints.concat(res);
        }, (err : any) => {

        })
    }

    moreComplaints(){
        if(this.searching == true){
            if(this.filtering == false){
                this.pgNoS++;
                this.search(this.searchString);
            }
            else{
                this.pgNoFS++;
                this.filteredSearch(this.searchString);
            }
            this.pgNo = 1;
        }
        else if(this.filtering == true && this.filterSearching == false) {
            this.pgNoF++;
            this.filter(); 
        }
        else if(this.sorting == true){
            this.pgNoSort++;
            this.sort(); 
        }
        else{
            this.pgNo++;
            this.getComplaints(this.pgNo);
        }
    }

    openComplaint( complaint : any, index : number ){
        this.isOpen = false;
        this.index = index;
        this.toclose = false;
        this.toreopen = false;
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
        if(!this.isStudent){
            this.cs.getFacultyList().subscribe( (res :any) => { 
                this.FacultyList = res;
            }, (err :any) => {
    
            });
        }
        
        this.cs.getStatusList().subscribe( (res :any) => { 
            this.StatusList = res;
            console.log(res);
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

    search(str : any){
        if(this.sorting == true){
            this.removeSort();
        }
        if(this.filtering == true){
            this.removeFilter();
        }
        if(str.value != this.searchString.value){
            this.pgNoS = 1;
        }

        this.searchString = str;
        if(str.value.trim() == ''){
            this.complaints = this.complaintsCopy;
            this.searching = false;
            this.pgNoS = 1;
        }
        else{
            this.searching = true;
            let searchQuery = {
                search : str.value
            }
    
            this.cs.search(this.pgNoS,searchQuery).subscribe( (res:any) => {
                if(this.pgNoS == 1){
                    this.complaints = res;
                }
                else{
                    this.complaints = this.complaints.concat(res);
                }
    
                if(res.length < 12){
                    this.more = false;
                }
                else{
                    this.more = true;
                }
    
            }, (err:any) => {
    
            })
        }
        
        console.log(str.value);   
    }

    filter(){
        if(this.pgNoF == 1){
            this.removeSearch();
        }
        if(this.searchString.value){
            this.searchString.value = '';
        }
        this.removeSort();
        this.filtering = true;
        let filterBy : any;
        let filterValue :any =this.filterBy; 
        if(this.filterType == 'p'){
            filterBy = 'priority';
        }
        else if(this.filterType == 's'){
            filterBy = 'status';
            
        }
        else{
            filterBy = 'category';
        }
        this.filterCate = filterBy;
        this.cs.filter(filterBy,filterValue,this.pgNoF).subscribe( (res:any)=>{
            if(res.length < 12){
                this.more = false;
            }
            else{
                this.more = true;
            }
            if(this.pgNoF == 1){
                this.complaints = res;
                this.filteredComplaintsCopy = res;
            }
            else{
                this.complaints = this.complaints.concat(res); 
            }
        }, (err:any)=>{

        });
    }

    removeFilter(){
        this.pgNo=1;
        this.filtering = false;
        this.pgNoF = 1;
        this.filterBy = '';
        this.filterShow = '';
    }

    func(p : any){
        this.filterBy = p.id;
        this.pgNoF = 1;
        if(p.name){
            this.filterShow = p.name;
        }
        else{
            this.filterShow = p.id;
        }
    }

    removeSort(){
        this.sorting = false;
        this.pgNoSort = 1;
        this.sortBy = '';
        this.pgNo =1;
    }

    removeFilterSearch(){
        this.filterSearching = false;
        this.complaints = this.filteredComplaintsCopy;
        this.pgNoFS = 1;
        this.pgNoF =1;
    }
    
    sort(){
        if(this.pgNoSort == 1){
            this.removeSearch();
        }
        if(this.searchString.value){
            this.searchString.value = '';
        }
        
        this.removeFilter();
        this.sorting = true;
        this.cs.sort(this.sortBy, this.pgNoSort).subscribe((res : any) => {
            if(res.length < 12){
                this.more = false;
            }
            else{
                this.more = true;
            }
            if(this.pgNoSort == 1){
                this.complaints = res;
                console.log(this.pgNoSort);
            }
            else{
                console.log(this.pgNoSort);
                console.log('more');
                this.complaints = this.complaints.concat(res); 
                console.log(this.complaints);
            } 
        }, (err:any)=>{
        })
    }

    filteredSearch(skey:any){
        if(this.sorting == true){
            this.removeSort();
        }
        if(skey.value != this.searchString.value){
            this.pgNoS = 1;
        }

        this.searchString = skey;
        if(skey.value.trim() == ''){
            this.complaints = this.complaintsCopy;
            this.searching = false;
            this.pgNoS = 1;
        }
        else{

            this.filterSearching = true;
            let searchQuery = {
                search : skey.value
            }
            this.cs.filterSearch(this.filterCate, this.filterBy, this.pgNoFS, searchQuery).subscribe( (res:any) => {
                if(res.length < 12){
                    this.more = false;
                }
                else{
                    this.more = true;
                }
                if(this.pgNoSort == 1){
                    this.complaints = res;
                }
                else{
                    this.complaints = this.complaints.concat(res); 
                } 
            }, (err:any)=>{
    
            })
        }
        
    }

    removeSearch(){
        this.searching = false;
        if(this.filtering == true){
            this.complaints = this.filteredComplaintsCopy;
            this.pgNoF = 1;
            this.pgNoFS = 1;
        }
        else{
            this.complaints = this.complaintsCopy;
            this.pgNoS = 1;
            this.pgNo = 1;
        }
    }
}