import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SuggestionsComponent } from './suggestions.component';

@NgModule({
    imports : [ RouterModule.forChild([
        {
            path : '',
            component : SuggestionsComponent
        }
    ]) ],
    declarations : [SuggestionsComponent]
})
export class SuggestionsModule{
    
}