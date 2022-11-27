import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { TestComponent } from './test/test.component';
import { MyFeedsComponent } from './Components/my-feeds/my-feeds.component';
import { AllGroupsComponent } from './Components/all-groups/all-groups.component';
import { ManageComponent } from './Components/manage/manage.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { DialogContComponent } from './Components/dialog-cont/dialog-cont.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UpdateProfileComponent } from './Components/update-profile/update-profile.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { Manage2Component } from './Components/manage2/manage2.component';
const routes: Routes = [
  {'path':'test',component:TestComponent},
  {'path':'myFeed',component:MyFeedsComponent},
  {'path':'AllGroups',component:AllGroupsComponent},
  {'path':'myProfile',component:MyProfileComponent},
  {'path':'manage',component:ManageComponent},
  {'path':'DialogContentExampleDialog',component:DialogContComponent},
  {'path':'login',component:LoginComponent},
  {'path':'Register',component:RegisterComponent},
  {'path':'editProfile',component:UpdateProfileComponent},
  {'path':'logout',component:LogoutComponent},
  {'path':'notif',component:NotificationsComponent},
  {'path' : 'MyGroups',component:Manage2Component},
  {'path':'',component:HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
