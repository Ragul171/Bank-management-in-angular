import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectId } from 'mongoose';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http:HttpClient) { }
  registerService(nam:string,acno:string,mail:string,uname:string,pw:string,gen:string):Observable<any>{
    return this.http.post("http://172.16.7.75:5000/register",{name:nam,accno:acno,username:uname,pwd:pw,gender:gen,email:mail});
  }
  loginService(uname:string,pw:string):Observable<any>{
    return this.http.post("http://172.16.7.75:5000/login",{username:uname,pwd:pw});
  }
  homeService(uname:ObjectId):Observable<any>{
    return this.http.post("http://172.16.7.75:5000/home",{username:uname});
  }
  profileService(uname:ObjectId):Observable<any>{
    return this.http.post("http://172.16.7.75:5000/profile",{username:uname});
  }
  validateToService(toAcc:string):Observable<any>{
    return this.http.post("http://172.16.7.75:5000/validate",{to:toAcc})
  }
  transferService(frm:number,toAcc:number,amt:number):Observable<any>{
    return this.http.post("http://172.16.7.75:5000/transfer",{from:frm,to:toAcc,amount:amt});
  }
  adminService():Observable<any>{
    return this.http.get("http://172.16.7.75:5000/admin")
  }
  addAccService(nam:string,acno:string,balance:string):Observable<any>{
    return this.http.post("http://172.16.7.75:5000/addacc",{name:nam,accno:acno,bal:balance})
  }
  deleteService(acno:string):Observable<any>{
    return this.http.post("http://172.16.7.75:5000/deleteacc",{accno:acno})
  }
  depositService(acno:string,amt:string):Observable<any>{
    return this.http.post("http://172.16.7.75:5000/deposit",{accno:acno,amount:amt})
  }
  withdrawService(acno:string,amt:string):Observable<any>{
    return this.http.post("http://172.16.7.75:5000/withdraw",{accno:acno,amount:amt})
  }
}
