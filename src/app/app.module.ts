import { AddContentComponent } from './page/add-content/add-content.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { ContentsComponent } from './page/contents/contents.component';
import { EditContentComponent } from './page/edit-content/edit-content.component';
import { ContentDetailComponent } from './page/content-detail/content-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './page/profile/profile.component';
import { EditProfileComponent } from './page/profile/edit-profile/edit-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ContentsComponent,
    AddContentComponent,
    EditContentComponent,
    ContentDetailComponent,
    HeaderComponent,
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AngularEditorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
