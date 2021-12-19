import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TransferComponent } from './transfer/transfer.component';
import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"home",component:HomeComponent,canActivate: [AuthenticationGuard]},
  {path:"profile",component:ProfileComponent,canActivate: [AuthenticationGuard]},
  {path:"transfer",component:TransferComponent,canActivate: [AuthenticationGuard]},
  {path:"admin",component:AdminComponent,canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
