import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SuggestionsComponent } from './suggestions.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports : [ FormsModule,CommonModule, RouterModule.forChild([
        {
            path : '',
            component : SuggestionsComponent
        },
        {
            path : 'add-suggestion',
            loadChildren : 'app/components/suggestions/add/add.module#AddSuggestionModule'
        }
    ]) ],

    declarations : [SuggestionsComponent]
})
export class SuggestionsModule{
    constructor(){
        console.log("sugg mod");
    }
}