import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGaurd } from './providers/authGaurd';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    RouterModule.forRoot([
      {
        path : 'login',
        loadChildren : 'app/components/login/login.module#LoginModule'
      },
      {
        path : '',
        loadChildren : 'app/components/management/management.module#ManagementModule',
        canLoad : [AuthGaurd]
      }
    ])
  ],
  providers: [AuthGaurd],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
