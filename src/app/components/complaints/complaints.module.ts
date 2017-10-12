import { NgModule } from '@angular/core';
import { ComplaintsComponent } from './complaints.component';
import { RouterModule } from '@angular/router';
import { CustomHttpService } from '../../providers/customHttp.service';
import { Urls } from '../../providers/app.constant';
import { CommonModule } from '@angular/common';
import { DateFilter } from '../../pipes/date.pipe';
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
    providers : [ CustomHttpService,Urls ]    
})
export class ComplaintsModule{
}