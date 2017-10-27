import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClosedPollComponent } from './closedPoll.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports : [ CommonModule,
        RouterModule.forChild([
            {
                path : '',
                component : ClosedPollComponent
            }
        ])
    ],
    declarations : [ ClosedPollComponent ]
})
export class ClosedPollModule{

} 