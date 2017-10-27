import { NgModule } from '@angular/core';
import { ManagementComponent } from './management.component';
import { RouterModule } from '@angular/router';
import { CustomHttpService } from '../../providers/customHttp.service';
import { Urls } from '../../providers/app.constant';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations : [ManagementComponent],
    imports : [ CommonModule ,RouterModule.forChild([
        {
            path : '',
            redirectTo : 'complaints',
            pathMatch : 'full'
        },
        {
            path : '',
            component : ManagementComponent,
            children : [
                {
                    path : 'complaints',
                    loadChildren : 'app/components/complaints/complaints.module#ComplaintsModule', 
                },
                {
                    path : 'suggestions',
                    loadChildren : "app/components/complaints/complaints.module#ComplaintsModule"
                },
                {
                    path : 'appreciations',
                    loadChildren : "app/components/appreciation/appreciation.module#AppreciationModule"
                },
                {
                  path : 'polls',
                  loadChildren : "app/components/poll/poll.module#PollModule",
                }
            ]
        }
        
    ]) ],
    providers : [ CustomHttpService,Urls ]
})
export class ManagementModule{
}