import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
import { ObjectId } from 'mongoose';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private mydb:DatabaseService,private _router: Router,private sharedUser:SharedServiceService) { console.log(this.sharedUser.accno);}
  user!:ObjectId;
  name:string="";
  balance:Number=0;
  summary:any;
  curaccno:Number=0;
  
  
  ngOnInit(): void {
    this.user=this.sharedUser.userid;
    this.curaccno=this.sharedUser.accno;
    this.mydb.homeService(this.user).subscribe(data=>{
      console.log(data["result"])
      this.name=data["result"].name;
      this.balance=data["accdet"].accbal;
      this.summary=data["summary"];
    })
  }
  logoutUser(){
    this._router.navigateByUrl('/login');
  }
}
