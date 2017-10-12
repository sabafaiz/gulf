import { NgModule } from '@angular/core';
import { ManagementComponent } from './management.component';
import { RouterModule } from '@angular/router';
import { CustomHttpService } from '../../providers/customHttp.service';
import { Urls } from '../../providers/app.constant';

@NgModule({
    declarations : [ManagementComponent],
    imports : [ RouterModule.forChild([
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
                    loadChildren : "app/components/suggestions/suggestions.module#SuggestionsModule"
                }
            ]
        }
        
    ]) ],
    providers : [ CustomHttpService,Urls ]
})
export class ManagementModule{
}