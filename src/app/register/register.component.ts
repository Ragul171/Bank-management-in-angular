import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private mydb:DatabaseService) { }
  name:string="";
  accno:string="";
  email:string="";
  pwd:string="";
  gender:string="";
  username:string="";
  error:string=""
  ngOnInit(): void {
  }
  registerUser(){
    if((this.name=="")||  (this.accno=="") || (this.email=="") || (this.pwd=="") || (this.gender=="") || (this.username==""))
      alert("Please enter all the fields")
    else{
      this.mydb.registerService(this.name,this.accno,this.email,this.username,this.pwd,this.gender).subscribe(data=>{
        if(data["message"])
          alert("Registered Successfully");
        else
          alert(data["error"]);
      })
    }
  }
  validatePass(){
    if(this.pwd=="")
      this.error="Password not entered"
    else if(this.pwd.length < 8)
      this.error="Password length should be greater than 8 characters";
    else if (!/[a-z]/.test(this.pwd) || ! /[A-Z]/.test(this.pwd) ||!/[0-9]/.test(this.pwd))
      this.error="Password should contain capital letter and number"
    else
      this.error="Password Strong"
  }
}
