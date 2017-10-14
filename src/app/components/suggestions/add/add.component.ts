import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ComplaintsService } from '../../../providers/complaints.service';
import { Validators } from '@angular/forms'

declare let $ : any;

@Component({
    selector : 'add-suggestion',
    templateUrl : './add.component.html',
    providers : [ComplaintsService]
})
export class AddSuggestionComponent{
    public isSub:boolean = false;
    public isSubsub:boolean = false;
    public categories : any [] = [];
    public selectedCategory : any;
    public selectedSubCategory : any ;
    public subArray : any [] = [];
    public anonymous : boolean = false;
    public title : string;
    public description : string;
    public againstCategoryId : number;
    public againstEmployeeId  : number;
    
    constructor( private cs : ComplaintsService){
        this.getCategory();
    }


    getCategory(){
        this.cs.getCategory().subscribe( (res : any) => {
            this.categories = res;
            console.log(this.categories);
            this.getFaculty();
        }, (err : any) => {
            
        } )
        
    }

    getFaculty(){
        this.cs.getFaculty().subscribe( (res :any ) => {
            for(let cat of this.categories){
                if(cat.name == 'Teaching and learning'){
                    for(let subcat of cat.subCategory){
                        if(subcat.name == 'Faculty Member'){
                            subcat.subCategory = res;
                        }
                    }
                }
            }
            console.log("Cate : ");
            console.log(this.categories);

        }, (err : any) => {

        })
    }

    addSuggestion(f :any){
        console.log("form");
        console.log(f);
        if(this.isSubsub){
            if(this.selectedSubCategory.name != 'Faculty Member'){
                this.againstCategoryId = this.againstEmployeeId;

            }
        }

        var obj = {
            anonymous : this.anonymous,
            title : this.title,
            description : this.description,
            againstCategoryId : this.againstCategoryId
        }
        if(this.selectedSubCategory.name == 'Faculty Member'){
            obj['againstEmployeeId'] = this.againstEmployeeId
        }
        console.log(obj);
        this.cs.postComplaint(obj).subscribe( (res : any ) => {
            $('#success').modal('show');
        }, ( err : any ) => {

        })
    }

    onChange(){
        
        console.log(this.selectedCategory);
        if(this.selectedCategory.subCategory){
            this.isSub = true;
        }
        else{
            this.isSub = false;
            this.againstCategoryId = this.selectedCategory.id;
        }
    }

    
    onChangeSub(){
        console.log(this.selectedSubCategory);
        if(this.selectedSubCategory.subCategory){
            this.isSubsub = true;
            if(this.selectedSubCategory.name == 'Faculty Member'){
                this.againstCategoryId = this.selectedSubCategory.id;
            }
        }
        else{
            this.isSubsub = false;
            this.againstCategoryId = this.selectedSubCategory.id;
        }   
    }
}