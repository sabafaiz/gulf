import { NgModule } from '@angular/core';
import { ComplaintsComponent } from './complaints.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports : [  FormsModule,
        CommonModule, RouterModule.forChild([
        {
            path : '',
            component : ComplaintsComponent
        },
        {
            path : 'add-complaint',
            loadChildren : 'app/components/complaints/add/add.module#AddComplaintModule' 
        }
    ])],
    declarations : [ ComplaintsComponent ],
})
export class ComplaintsModule{
}