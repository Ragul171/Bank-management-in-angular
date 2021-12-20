import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  userid:string="";
  lStatus:boolean=false;
  adminLogged:boolean=false;
  accno:number=0;
  constructor() { }
}
