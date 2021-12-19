import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private sharedService:SharedServiceService,private router:Router) { }
  ngOnInit(): void {
  }
  home(){
    this.router.navigateByUrl('/home');
  }
  profile(){
    this.router.navigateByUrl('/profile');
  }
  transfer(){
    this.router.navigateByUrl('/transfer');
  }
  loggedin(){
    return this.sharedService.lStatus;
  }
  adminLogged(){
    return this.sharedService.adminLogged;
  }
  onlogout(){
    this.sharedService.lStatus=false;
    this.sharedService.adminLogged=false;
    this.sharedService.accno=0;
    localStorage.removeItem('currentuser')
    this.router.navigateByUrl('/login');
  }
}
