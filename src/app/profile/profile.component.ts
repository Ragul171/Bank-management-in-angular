import { Component, OnInit } from '@angular/core';
import { ObjectId } from 'mongoose';
import { DatabaseService } from '../database.service';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private sharedUser:SharedServiceService,private mydb:DatabaseService) { }
  user!:ObjectId;
  name:string="";
  email:string="";
  pwd:string="";
  gender:string="";
  username:string="";
  accno:number=0;
  branchid:number=0;
  bal:number=0;
  bankname:string="";
  ifsc:string="";
  city:string="";
  ngOnInit(): void {
    this.user=this.sharedUser.userid;
    this.mydb.profileService(this.user).subscribe(data=>{
      this.username=data["result"].username;
      this.email=data["result"].email;
      this.name=data["result"].name;
      this.gender=data["result"].gender;
      this.accno=data["result"].accno;
      this.branchid=data["accdet"].branchid;
      this.bal=data["accdet"].accbal;
      this.bankname=data["bank"].bankname;
      this.ifsc=data["bank"].ifsc;
      this.city=data["bank"].city;
    })
  }

}
