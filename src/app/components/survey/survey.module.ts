import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SurveyComponent } from './survey.component';
import { CommonModule } from '@angular/common';
import { CustomHttpService } from '../../providers/customHttp.service';
import { Urls } from '../../providers/app.constant';

@NgModule({
    imports : [ CommonModule, RouterModule.forChild([
        {
            path : '',
            component : SurveyComponent
        }
    ])],
    declarations  : [SurveyComponent],
    providers : [ Urls, CustomHttpService]
})
export class SurveyModule{

}