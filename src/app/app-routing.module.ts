import { ChatComponent } from './page/chat/chat.component';
import { GuardAuthenService } from './services/guard-authen.service';
import { GuardLoginService } from './services/guard-login.service';
import { RegisterComponent } from './page/register/register.component';
import { LoginComponent } from './page/login/login.component';
import { EditProfileComponent } from './page/profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './page/profile/profile.component';
import { HomeComponent } from './page/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentsComponent } from './page/contents/contents.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'contents', component: ContentsComponent
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [GuardAuthenService]
  },
  {
    path: 'edit-profile', component: EditProfileComponent
  },
  {
    path: 'login', component: LoginComponent, canActivate: [GuardLoginService]
  },
  {
    path: 'register', component: RegisterComponent, canActivate: [GuardLoginService]
  },
  {
    path: 'chat', component: ChatComponent, canActivate: [GuardAuthenService]
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/home', pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
