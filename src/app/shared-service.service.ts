import { Injectable } from '@angular/core';
import { ObjectId } from 'mongoose';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  userid!:ObjectId;
  lStatus:boolean=false;
  adminLogged:boolean=false;
  accno:number=0;
  constructor() { }
}
