import { Component } from '@angular/core';
import { LoginService } from '../../providers/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    selector : 'login',
    templateUrl : './login.component.html',
    styleUrls : ['./login.component.css'],
    providers : [LoginService]
})
export class LoginComponent{
    public type : string;

    loginForm : FormGroup = new FormGroup({
        username : new FormControl('',[Validators.required]),
        password : new FormControl('',[Validators.required]) 
    })
    constructor(private ls : LoginService, public router:Router){        
        this.setLoginType('management');
    }
    verifyUser(){
        console.log(this.loginForm);
        this.ls.verifyUser(this.loginForm.value).subscribe( (res) => {
            console.log("success");
            this.loginSuccess(res);
        }, (err) => {

        })
    }
    loginSuccess(data : any){
        localStorage.setItem('access_token',data.access_token);
        var type : string;

        if(localStorage.getItem('loginType')=='student'){
            type = 'st';
        }
        else{
            type = 'ma';
        }
        this.ls.getUserData(type).subscribe((res) => {
            this.setUserData(res);
        }, (err) => {
        })
    }
    setUserData(data : any){
        this.ls.setUserData(data);
        this.router.navigate(['/']);
    }

    setLoginType( type : string){
        this.type = type;
        localStorage.setItem('loginType',type);
    }
}