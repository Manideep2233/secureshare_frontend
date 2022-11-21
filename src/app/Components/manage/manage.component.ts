import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { groups_list } from 'src/app/Models/groups_list';
import { DefaultService } from 'src/app/services/default.service';
import { DialogContComponent } from '../dialog-cont/dialog-cont.component';
import { DisplayDialogComponent } from '../display-dialog/display-dialog.component';
import { user_model } from 'src/app/Models/user_model';
import { group_model } from 'src/app/Models/group_model';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  groups_list:group_model[]=[];
  Users:user_model[]=[];
  constructor(private router:Router,private ps:DefaultService,public dialog: MatDialog) { }

  ngOnInit() {
    let token=localStorage.getItem("token");
    if(token=='' || token== undefined || token== null) {
      this.openDialog("Unauthorized! Please Login Again");
      this.router.navigate(['']);
      return;
    }
    this.ps.getAllUsers().subscribe(res=>{
      if(res.status=='SUCCESS') {
      let jsonObj = JSON.parse(JSON.stringify(res.response)); // string to "any" object first
      let employee = jsonObj as user_model[];
      this.Users=employee;
      } else {
        this.openDialog(JSON.stringify(res.response));
      }
    });
    this.ps.allGroups().subscribe(res=>{
      let jsonObj = JSON.parse(JSON.stringify(res.response)); // string to "any" object first
      let employee = jsonObj as group_model[];
      this.groups_list=employee;
    })
  }
  editSize(groupid:any) {
      const dialogRef = this.dialog.open(DialogContComponent,{
        width:'300px',
        data:['user',groupid]
      });
  }
  editGroupSize(groupid:any) {
    const dialogRef = this.dialog.open(DialogContComponent,{
      width:'300px',
      data:['group',groupid]
    });
  }
  deleteGroup(groupid:any) {
    this.ps.deleteGroup(groupid).subscribe(res=>{
      if(res.status=='SUCCESS') {
      this.openDialog(res.response);
      } else {
        this.openDialog("Something Went Wrong!!");
      }
    });
  }
  deleteUser(userId:any) {
    this.ps.deleteUser(userId).subscribe(res=>{
      if(res.status=='SUCCESS') {
        this.openDialog(res.response);
      } else {
        this.openDialog("Something Went Wrong!!");
      }
    })
  }
  openDialog(msg:any) {
    const dialogRef = this.dialog.open(DisplayDialogComponent, {
      width: '250px',
      data:msg
    });
  }

}