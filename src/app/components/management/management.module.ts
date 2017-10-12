import { NgModule } from '@angular/core';
import { ManagementComponent } from './management.component';
import { RouterModule } from '@angular/router';

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
        
    ]) ]
})
export class ManagementModule{
}