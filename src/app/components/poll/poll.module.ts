import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PollComponent } from './poll.component';
import { CommonModule } from '@angular/common';
import { ForMePollComponent } from './for-me/for-me.component';


@NgModule({
    imports : [ CommonModule, RouterModule.forChild([
        {
            path : '',
            component : PollComponent
        },
        {
            path : 'add-poll',
            loadChildren : "app/components/poll/add/add.module#AddPollModule",
        },
        {
            path : 'closed-polls',
            loadChildren : "app/components/poll/closed/closedPoll.module#ClosedPollModule"
        },
        {
            path : 'for-me',
            component : ForMePollComponent
        }
    ])],
    declarations : [ PollComponent,ForMePollComponent ]
})
export class PollModule{ }