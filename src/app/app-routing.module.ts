import { EditProfileComponent } from './page/profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './page/profile/profile.component';
import { HomeComponent } from './page/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentsComponent } from './page/contents/contents.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'contents', component: ContentsComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },{
    path:'edit-profile',component:EditProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
