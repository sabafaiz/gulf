import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppreciationComponent } from './appreciation.component';
import { Urls } from '../../providers/app.constant';
import { CustomHttpService } from '../../providers/customHttp.service';
import { HttpModule } from '@angular/http'; 
import { CommonModule } from '@angular/common';

@NgModule({
    imports : [ CommonModule,HttpModule,RouterModule.forChild([
        {
            path : '',
            component : AppreciationComponent
        },
        {
            path : 'by-you',
            component : AppreciationComponent   
        },
        {
            path : 'add-appreciation',
            loadChildren : 'app/components/appreciation/add appreciation/add.module#AddAppreciationModule' 
        }
    ]) ],
    declarations : [ AppreciationComponent ], 
})
export class AppreciationModule{
}
