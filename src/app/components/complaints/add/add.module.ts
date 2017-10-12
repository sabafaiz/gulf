import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddComplaintComponent } from './add';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations : [ AddComplaintComponent ],
    imports : [ CommonModule, FormsModule,
        RouterModule.forChild([
        {
            path : '',
            component : AddComplaintComponent
        }
    ]) ]
})
export class AddComplaintModule{
}