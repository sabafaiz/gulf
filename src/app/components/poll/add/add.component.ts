import { Component } from '@angular/core';
import { PollService } from '../../../providers/poll.service';
import { OnInit } from '@angular/core'; 
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';

declare let $ : any;
@Component({
    selector : 'add-poll',
    templateUrl : './add.component.html',
    styleUrls : ['./add.component.css'],
    providers : [PollService]
})
export class AddPollComponent implements OnInit{
    public addPollForm : FormGroup;
    public isStudent : boolean;
    public mainAudience : any[] = [];
    public subAudience : any[] = [] ;
    public subSubAudience : any[] = []; 
    public message : string = '' ; 
    // public departments : any [] = [];
    // public programs : any [] = []; 
    // public programYears : any [] = [] ;
    // public moduleYears : any [] = [] ;
    // public modules : any [] = [];
    public options : any[] = ['',''];
    public optionTypes : any[] = [];
    public maxOptions : number;
    public show : boolean = false;
    public subShow : boolean = false;
    public subSelected : any [] = [];
    public subSubSelected : any [] = [];
    public subString : String = 'Select';
    public subSubString : String = 'Select';
    // public subAudience : any [] = []; //university selected audi
    // public selectedSubAudi : any [] = []; // dept selected audi
    // public selectedDepartments : any [] = []; // dept selected depts
    // public selectedPrograms : any [] = [] ; //prog selected
    // public selectedProgYrs : any [] = []; //prog selected yrs
    // public selectedModules : any [] = []; // selected modules
    // public selectedModuleYrs : any [] = []; // selected nmodule yrs
    // public deptAudiString : string = 'Select' ;
    // public deptString : string = 'Select';
    // public subAudiString : string = 'Select';
    // public selectedProgramsString : string = 'Select';
    // public selectedProgYrsString : string = 'Select';
    // public selectedModulesString : string = 'Select';
    // public selectedModuleYrsString : string = 'Select'; 
    today : any;
    isLoader : boolean = false;
    invalidDate : boolean = false; 

    constructor( private ps : PollService){

        let date : any = new Date();
        let dd : any= date.getDate();
        let mm : any = date.getMonth() + 1;
        let yyyy : any = date.getFullYear();
        if(dd < 10){
            dd ='0'+dd;
        }
        if(mm < 10){
            mm = '0' + mm;
        }
        date = `${yyyy}-${mm}-${dd}`;
        this.today = date;
        console.log(this.today);
        if(localStorage.getItem('loginType')=='student'){
            this.isStudent = true;
        }
        else{
            this.isStudent = false;
        }
    }

    ngOnInit(){
        this.ps.getAudience().subscribe( (res:any) => {
            console.log(res);
            res.audience.splice(4,res.audience.length - 4);
            this.mainAudience = res.audience;
            this.optionTypes  = res.optionType;
            this.maxOptions = res.optionLimit;
            console.log(this.mainAudience);
        }, (err:any) => {

        })
        this.addPollForm = this.getForm();
    }

    getForm(){
        return new FormGroup({
            question : new FormControl('',Validators.required),
            expiredAt : new FormControl(this.today,Validators.required),
            subOptions : new FormArray([]),
            optionTypeId : new FormControl('',Validators.required),
            mainAudienceId : new FormControl('',Validators.required)
        })
    }

    getDepartments(){
        this.ps.getDepartments().subscribe( (res:any) => {
            // for( let i=0;i<res.length; i++ ){
                this.subSubAudience = res;
            // }
            
        }, (err : any) => {

        })
    }

    getPrograms(){
        this.ps.getPrograms().subscribe( (res:any)=>{
            // for( let i=0;i<res.length; i++ ){
                this.subAudience = res ;
            // }
        }, (err:any) => {

        })
    }

    getProgramYears(){
        this.ps.getProgramYears().subscribe( (res:any) => {
            // for( let i=0;i<res.length; i++ ){
                this.subSubAudience = res;
            // }
        }, (err:any) => {

        })
    }

    getYearsForModule(){
        this.ps.getYearsForModules().subscribe( (res : any) => {
            // for( let i=0;i<res.length; i++ ){
                this.subAudience = res ;
            // }
            console.log(res);
        }, (err:any) => {

        })
    }

    getModules(yrId : any){
        console.log(yrId);
        this.ps.getModulesByYear(yrId).subscribe((res:any) =>{
            // for( let i=0;i<res.length; i++ ){
                this.subSubAudience = res;
            // }
        }, (err:any) => {

        })
    }

    audienceChange(){
        this.refresh();
        if(this.addPollForm.get('mainAudienceId').value == 1){
            for( let i=0;i<this.mainAudience[0].subAudience.length; i++ ){
                this.subAudience[i] = this.mainAudience[0].subAudience[i];
            }
        }
        else if(this.addPollForm.get('mainAudienceId').value == 2){
            for( let i=0;i<this.mainAudience[1].subAudience.length; i++ ){
                this.subAudience[i] = this.mainAudience[1].subAudience[i] ;
                this.getDepartments();
            }                                                                            
        } 
        else if(this.addPollForm.get('mainAudienceId').value == 3){
            this.getPrograms();
            this.getProgramYears();
        }  
        else if(this.addPollForm.get('mainAudienceId').value == 4){
            this.getYearsForModule();
        }
    }

    refresh(){
        this.show = false;
        this.subShow = false;
        this.subSelected = [];
        this.subSubSelected = [];
        this.subAudience = [];
        this.subSubAudience = [];
        this.subString = 'Select';
        this.subSubString = 'Select';
        // this.subAudience = []; //university selected audi
        // this.selectedSubAudi = []; // dept selected audi
        // this.selectedDepartments = []; // dept selected depts
        // this.selectedPrograms= [] ; //prog selected
        // this.selectedProgYrs = []; //prog selected yrs
        // this.selectedModules = []; // selected modules
        // this.selectedModuleYrs = [];
        // this.deptAudiString  = 'Select' ;
        // this.deptString  = 'Select';
        // this.subAudiString  = 'Select';
        // this.selectedProgramsString  = 'Select';
        // this.selectedProgYrsString  = 'Select';
        // this.selectedModulesString  = 'Select';
        // this.selectedModuleYrsString = 'Select';
    }
    
    subSelect( item:any, check :any ){
        if(check.checked == true){

                if(this.addPollForm.get('mainAudienceId').value == 4){
                    this.subSelected.push(item.yearId);
                    this.getModules(item.yearId);
                } 
                else{
                    this.subSelected.push(item.id);
                }

                if(this.subSelected.length == 1){
                    this.subString = item.name;
                }
                else{
                    this.subString += ` ${item.name}`;
                }
            }
            else{
                let index = this.subSelected.indexOf(item.id);
                this.subSelected.splice(index,1);
                if(this.subSelected.length == 0){
                    this.subString = 'Select';
                }
                else{
                    this.subString = this.subString.replace(item.name,'');
                }
            }
    }

    subSubSelect( item:any, check :any ){
    
            if(check.checked == true){
                if(this.addPollForm.get('mainAudienceId').value == 4){
                    this.subSubSelected.push(item.moduleId);
                }
                else{
                    this.subSubSelected.push(item.id);
                } 

                if(this.subSubSelected.length == 1){
                    this.subSubString = item.name;
                }
                else{
                    this.subSubString += ` ${item.name}`;
                }
            }
            else{
                let index = this.subSubSelected.indexOf(item.id);
                this.subSubSelected.splice(index,1);
                if(this.subSubSelected.length == 0){
                    this.subSubString = 'Select';
                }
                else{
                    this.subSubString = this.subSubString.replace(item.name,'');
                }
            }
    }

    trackByIndex(index: number, value: number) {
        return index;
    }
    // subAudienceSelect(item:any, check :any){
    //     console.log(item);
    //     console.log(check.checked);
    //     if(check.checked == true){
    //         this.subAudience.push(item.id); 
    //         if(this.subAudience.length == 1){
    //             this.subAudiString = item.name;
    //         }
    //         else{
    //             this.subAudiString += ` ${item.name}`;
    //         }
    //     }
    //     else{
    //         let index = this.subAudience.indexOf(item.id);
    //         this.subAudience.splice(index,1);
    //         if(this.subAudience.length == 0){
    //             this.subAudiString = 'Select';
    //         }
    //         else{
    //             this.subAudiString = this.subAudiString.replace(item.name,'');
    //         }
    //     }
    //     console.log(this.subAudience);
    // }

    // deptSubAudi(item:any, check :any ){

    //     if(check.checked == true){
    //         this.selectedSubAudi.push(item.id); 
    //         if(this.selectedSubAudi.length == 1){
    //             this.deptAudiString = item.name;
    //         }
    //         else{
    //             this.deptAudiString += ` ${item.name}`;
    //         }
    //     }
    //     else{
    //         let index = this.selectedSubAudi.indexOf(item.id);
    //         this.selectedSubAudi.splice(index,1);
    //         if(this.selectedSubAudi.length == 0){
    //             this.deptAudiString = 'Select';
    //         }
    //         else{
    //             this.deptAudiString = this.deptAudiString.replace(item.name,'');
    //         }
    //     }
    //     console.log(this.selectedSubAudi);
    // }

    // depts(item:any, check :any){
    //     if(check.checked == true){
    //         this.selectedDepartments.push(item.id); 
    //         if(this.selectedDepartments.length == 1){
    //             this.deptString = item.name;
    //         }
    //         else{
    //             this.deptString += ` ${item.name}`;
    //         }
    //     }
    //     else{
    //         let index = this.selectedDepartments.indexOf(item.id);
    //         this.selectedDepartments.splice(index,1);
    //         if(this.selectedDepartments.length == 0){
    //             this.deptString = 'Select';
    //         }
    //         else{
    //             this.deptString = this.deptString.replace(item.name,'');
    //         }
    //     }
    //     console.log(this.selectedDepartments);
    // }
    optionsChange(query :string, index?:any){
        if(query == 'add'){
            this.options.push('');
        }
        else{
            this.options.splice(index, 1);
        }
    }
    func(){
        
        console.log(this.options);
    }

    submitPoll(){
        
        console.log(this.addPollForm.value);
        for(let i =0;i< this.options.length; i++){
           let obj = {
               choice : this.options[i]
           };
           (this.addPollForm.get('subOptions') as FormArray ).push(new FormControl(obj));
        }

        if(this.addPollForm.get('mainAudienceId').value == 1){
            this.addPollForm.addControl('audienceIds',new FormControl(this.subSelected));
        }
        else if(this.addPollForm.get('mainAudienceId').value == 2){
            this.addPollForm.addControl('audienceIds',new FormControl(this.subSelected));
            this.addPollForm.addControl('departmentIds',new FormControl(this.subSubSelected));
        }
        else if(this.addPollForm.get('mainAudienceId').value == 3){
            this.addPollForm.addControl('programIds',new FormControl(this.subSelected));
            this.addPollForm.addControl('yearIds',new FormControl(this.subSubSelected));
        }
        else if(this.addPollForm.get('mainAudienceId').value == 4){
            this.addPollForm.addControl('yearIds',new FormControl(this.subSelected));
            this.addPollForm.addControl('moduleIds',new FormControl(this.subSubSelected));
        }
        this.options = ['',''];
        this.subString = 'Select';
        this.subSubString = 'Select';
        this.subSelected = [];
        this.subSubSelected = [];
        
        console.log(this.addPollForm.value);
        this.ps.addPoll(this.addPollForm.value).subscribe( (res:any) => {
            console.log(res);
            this.isLoader = false;
            this.show = false;
            this.subShow = false;  
            this.message = 'Poll Added Successfully';
            this.addPollForm.reset();
            this.addPollForm = this.getForm();
            $('#message').modal('show');
        }, (err:any) => {
            this.isLoader = false;
        })        
    }
    
    dateCheck(date :any){
        console.log(date.value);
        if(this.today > date.value ){
            console.log("change date");
            this.invalidDate = true;
        }
        else{
            this.invalidDate = false;
        }
    }
}