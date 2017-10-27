import { Component } from '@angular/core';
import { AppreciationService } from '../../../providers/appreciation.service';

declare let $ :any;
@Component({
    selector : 'add-apprecation',
    templateUrl : 'add.component.html',
    providers : [AppreciationService]
})
export class AddAppreciationComponent{
    studentList: any[];
    moduleList: any[];
    modId: any='' ;
    list : any[] = [];
    title : any ;
    description : any;
    id:any='';
    stdId : any = ''; 
    isStudent  :boolean;
    show : any = false;
    subShow : any = false;
    constructor( private as : AppreciationService ){
        if(localStorage.getItem('loginType') == 'student'){
            this.getFacultyList();
            this.isStudent= true;
        }
        else{
            this.getYears();
            this.isStudent= false;
        }
    }

    getFacultyList(){
        this.as.getFaultyList().subscribe( (res :any) => {
            this.list = res;
            console.log(res);
        }, (err :any) => {

        })
    }

    getYears(){
        this.as.getYears().subscribe( (res :any) => {
            this.list = res;
            console.log(res);
        }, (err : any) => {

        })
    }

    getModules(){
        if(!this.isStudent){
            this.as.getModules(this.id).subscribe( (res : any) => {
                this.moduleList = res;
                this.show = true;
                console.log(res);
            }, (err : any) => {
    
            })
        }
    }

    getStudentList(){
        this.as.getStudents(this.id,this.modId).subscribe( (res : any) => {
            this.studentList = res;
            this.subShow = true;
            console.log(res);
        }, (err : any) => {

        })
    }

    heading(){
        if( this.isStudent){
            return 'Select Faculty';
        }
        return 'Select Year';
    }

    selectId(op:any){
        console.log(this.id);
    }

    submit(form){
        let obj = {title : this.title,
        description : this.description};
        if(this.isStudent){
            console.log(this.id);
            obj['facultyId'] = this.id; 
            console.log(obj);
            this.as.submit(obj).subscribe( (res:any) => {
                $('#message').modal('show');
                form.reset();
                this.id = '';
            }, (err :any) => {

            })
        }
        else{
            console.log(this.stdId);
            obj['studentId'] = this.stdId;
            console.log(obj); 
            this.as.submit(obj).subscribe( (res:any) => {
                $('#message').modal('show');
                form.reset();
                this.id = '';
                this.stdId = '';
                this.modId = '';
            }, (err :any) => {

            })
        }
    }
}