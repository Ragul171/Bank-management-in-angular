import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor( private sharedService:SharedServiceService,private mydb:DatabaseService) { }
  from:number=0;
  to:string ="";
  amount:number=0;
  val:string="";
  error:boolean=false;
  ngOnInit(): void {
    this.from=this.sharedService.accno;
  }
  transfer(){
    this.mydb.transferService(this.from,parseInt(this.to),this.amount).subscribe(data=>{
      if(data["message"]){
        alert("Transfer Success");
      }
      else if(data["error"])
        alert(data["error"]);
      else
        alert("Transfer Failed");
    })
  }
  validateToAccount(){
    this.mydb.validateToService(this.to).subscribe(data=>{
      if(data["message"]){
        this.val="Account validated";
        this.error=true;
        console.log(this.val);
      }
      else
      {
        this.val="Account invalid";
        this.error=true;
        console.log(this.val);
      }
    })
  }
}
