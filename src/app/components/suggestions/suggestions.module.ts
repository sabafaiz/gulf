import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SuggestionsComponent } from './suggestions.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports : [ CommonModule, RouterModule.forChild([
        {
            path : '',
            component : SuggestionsComponent
        },
        {
            path : 'add-suggestion',
            
        }
    ]) ],
    declarations : [SuggestionsComponent]
})
export class SuggestionsModule{
    
}