import  { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Urls } from '../../providers/app.constant';
import { CustomHttpService } from '../../providers/customHttp.service';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations : [LoginComponent],
    imports : [ CommonModule,
                ReactiveFormsModule, 
                FormsModule,
                RouterModule.forChild([
                    {
                        path : '',
                        component : LoginComponent
                    }
                ])
            ],
    providers : [Urls,CustomHttpService]
})
export class LoginModule{

}