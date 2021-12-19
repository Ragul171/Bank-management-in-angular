import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private mydb:DatabaseService,private _router: Router,private sharedUser:SharedServiceService) { }
  username:string="";
  pwd:string="";
  present:boolean=false;
  msg:string="";
  error:boolean=false;
  accno:number=0;
  ngOnInit(): void {
    document.body.classList.add('login');
  }
  loginUser(){
    this.error=false;
    if(this.username!="admin")
    {
      this.mydb.loginService(this.username,this.pwd).subscribe(data=>{
        if(data["message"])
        {
          this.msg="Logged In succesfully";
          this.present=true;
          this._router.navigateByUrl('/home');
          this.sharedUser.userid=data["result"];
          this.sharedUser.lStatus=true;
          this.sharedUser.accno=data["accno"];
          localStorage.setItem("currentuser",data["result"])
          document.body.classList.remove('login');
        }
        else
        {
          if(data["error"])
          {
            this.error=true;
            this.msg="Password incorrect";
          }
          else
            alert("User not exist");
        }
      });
    }
    else
    {
      if(this.pwd=="admin"){
        this._router.navigateByUrl('/admin')
        this.sharedUser.adminLogged=true;
        document.body.classList.remove('login');
        localStorage.setItem('currentuser','admin');
      }
    }
  }
  // }
  // get isLoggesIn(){
  //   return this.loginStatus.asObservable();
  // }
  // checkLoginStatus():boolean{
  //   return false;
  // }
}
