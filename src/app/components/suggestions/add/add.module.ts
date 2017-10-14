import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddSuggestionComponent } from './add.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations : [ AddSuggestionComponent ],
    imports : [ CommonModule, FormsModule,
        RouterModule.forChild([
        {
            path : '',
            component : AddSuggestionComponent
        }
    ]) ]
})
export class AddSuggestionModule{
}