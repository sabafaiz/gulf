import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddAppreciationComponent } from './add.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports : [ FormsModule, CommonModule, RouterModule.forChild([
        {
            path : '',
            component : AddAppreciationComponent
        }
    ])],
    declarations : [AddAppreciationComponent],
})
export class AddAppreciationModule{
    
}