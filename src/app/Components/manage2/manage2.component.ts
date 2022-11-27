import { Component } from '@angular/core';
import { DefaultService } from 'src/app/services/default.service';
import { Router } from '@angular/router';
import { DisplayDialogComponent } from '../display-dialog/display-dialog.component';
import {myGroups } from 'src/app/Models/myGroups';
import { ResponseObject } from 'src/app/Models/responseObject';
import { MatDialog } from '@angular/material/dialog';
import { UserGroup } from 'src/app/Models/userGroup';

@Component({
  selector: 'app-manage2',
  templateUrl: './manage2.component.html',
  styleUrls: ['./manage2.component.scss']
})
export class Manage2Component {
view: boolean[] = [];
show_group: boolean[] = [];
groupslist:myGroups[]=[];
constructor( private ps: DefaultService, public dialog: MatDialog, private router: Router) { }
ngOnInit() {
let token = localStorage.getItem("token");
    if (token == '' || token == undefined || token == null) {
      this.openDialog("Unauthorized! Please Login Again");
      this.router.navigate(['']);
      return;
    }
console.log("Printed");
this.ps.myGroups().subscribe(res => {
  console.log("Printed1");
      if (res.status == 'SUCCESS') {
        let jsonObj = JSON.parse(JSON.stringify(res.response)); // string to "any" object first
        let employee = jsonObj as myGroups[];
        this.groupslist = employee;
	  for (let i = 0; i < this.groupslist.length; i++) {
          this.show_group[i] = false;
          this.view[i] = true;
        }
      }
});
}
viewUsers(groupid: any,index: number) {
    this.view[index] = false;
    this.show_group[index] = true;
  }
HideUsers(index: number) {
    this.view[index] = true;
    this.show_group[index] = false;
  }
deleteUser(groupId:any,userId:any) {
let temp:UserGroup = {};
temp.groupId=groupId;
temp.userId=userId;
this.ps.removeUser(temp).subscribe(res => {
      if (res.status == 'SUCCESS') {
        let jsonObj = JSON.parse(JSON.stringify(res.response)); // string to "any" object first
        this.openDialog(res.response);
      } else {
this.openDialog("File doesn't meet the criteria to upload");
}

});
}

openDialog(msg: any) {
    const dialogRef = this.dialog.open(DisplayDialogComponent, {
      width: '250px',
      data: msg
    });
    dialogRef.afterClosed().subscribe(res=>{
      window.location.reload();
    });
  }


}