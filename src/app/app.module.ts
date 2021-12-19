import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatabaseService } from './database.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedServiceService } from './shared-service.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { TransferComponent } from './transfer/transfer.component';
import { AdminComponent } from './admin/admin.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AuthenticationGuard } from './authentication.guard';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path:'login',component:LoginComponent},
  { path:'register',component:RegisterComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    TransferComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    Ng2SearchPipeModule
  ],
  providers: [DatabaseService,SharedServiceService,AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
