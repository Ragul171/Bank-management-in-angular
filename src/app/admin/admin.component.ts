import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private mydb:DatabaseService) { }
  
  accname:string="";
  accno:string="";
  bal:string="";
  accdet:any;
  add:boolean=false;
  deposit:boolean=false;
  amount:string="";
  search:string="";
  ngOnInit(): void {
    this.accno="";
    this.amount="";
    this.mydb.adminService().subscribe(data=>{
      console.log(data["result"]);
      console.log(data["accdet"]);
      this.accdet=data["accdet"];
    })
  }
  btnClicked(){
    this.add=!this.add;
  }
  addAcc(){
    this.mydb.addAccService(this.accname,this.accno,this.bal).subscribe(data=>{
      if(data["message"]){
        alert("Account added successfully");
        this.ngOnInit();
      }
    })
  }
  deleteAcc(accno:string){
    // console.log(accno)
    this.mydb.deleteService(accno).subscribe(data=>{
      if(data["message"]){
        alert("Account deleted")
        this.ngOnInit();
      }
    })
  }
  depositClicked(accno:string){
    this.deposit=true;
    this.accno=accno
  }
  depositAcc(){
    this.mydb.depositService(this.accno,this.amount).subscribe(data=>{
      if(data["message"]){
        alert("deposited");
        this.ngOnInit();
      }
    })
  }
  withdrawClicked(accno:string){
    this.accno=accno;
  }
  withdrawAcc(){
    this.mydb.withdrawService(this.accno,this.amount).subscribe(data=>{
      if(data["message"]){
        alert("Withdraw Successfull");
        this.ngOnInit();
      }
    })
  }

}
