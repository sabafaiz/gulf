import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddPollComponent } from './add.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports : [ ReactiveFormsModule,FormsModule,CommonModule,RouterModule.forChild([
        {
            path : '',
            component : AddPollComponent
        }
    ])],
    declarations : [ AddPollComponent ] 
})
export class AddPollModule{

}