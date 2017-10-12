import { Component } from '@angular/core';
import { SuggestionsService } from '../../providers/suggestions.service';

@Component({
    selector : 'suggestions',
    templateUrl : './suggestions.component.html',
    styleUrls : ['suggestions.component.css'],
    providers : [SuggestionsService] 
})
export class SuggestionsComponent{
}