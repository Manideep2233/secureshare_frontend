import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { TestComponent } from './test/test.component';
import { MyFeedsComponent } from './Components/my-feeds/my-feeds.component';
import { AllGroupsComponent } from './Components/all-groups/all-groups.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { ManageComponent } from './Components/manage/manage.component';
import { DialogContComponent } from './Components/dialog-cont/dialog-cont.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UpdateProfileComponent } from './Components/update-profile/update-profile.component';
import { DisplayDialogComponent } from './Components/display-dialog/display-dialog.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { MfaComponent } from './Components/mfa/mfa.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TestComponent,
    MyFeedsComponent,
    AllGroupsComponent,
    MyProfileComponent,
    ManageComponent,
    DialogContComponent,
    LoginComponent,
    RegisterComponent,
    UpdateProfileComponent,
    DisplayDialogComponent,
    LogoutComponent,
    NotificationsComponent,
    MfaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
