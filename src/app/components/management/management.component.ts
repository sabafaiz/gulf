import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare let $ : any;
@Component({
    selector : 'management',
    templateUrl : './management.component.html',
    styleUrls : ['./management.component.css']
})
export class ManagementComponent {
    private sideNav = false;
    public confirm : boolean = false;
    constructor(private router : Router){
    }
    sideNavbar() {
        if(this.sideNav == false){
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
            document.getElementById("toggle").style.marginLeft = "220px";

        }
        else{
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
            document.getElementById("toggle").style.marginLeft = "10px";
        }    
        this.sideNav = !this.sideNav;
    }

    logout(){

        $('#logout').modal('show');
        if(this.confirm == true){
            localStorage.clear();
            this.router.navigate(['/login']);
        }
    }
    
    
}