import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { notification_list } from 'src/app/Models/notification_model';
import { DefaultService } from 'src/app/services/default.service';
import { DisplayDialogComponent } from '../display-dialog/display-dialog.component';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notif_list:notification_list[]=[];
  constructor(private router:Router,private ps:DefaultService,public dialog: MatDialog) { }

  ngOnInit() {
    let token=localStorage.getItem("token");
    if(token=='' || token== undefined || token== null) {
      this.openDialog("Unauthorized! Please Login Again");
      this.router.navigate(['']);
      return;
    }
    this.ps.viewRequests().subscribe(res=>{
      if(res.status=='SUCCESS') {
        let jsonObj = JSON.parse(JSON.stringify(res.response)); // string to "any" object first
        let employee = jsonObj as notification_list[];
        this.notif_list=employee;
      }
    })
  }
  openDialog(msg:any) {
    const dialogRef = this.dialog.open(DisplayDialogComponent, {
      width: '250px',
      data:msg
    });
  }
  acceptreq(reqId:any) {
    this.ps.acceptRequest(reqId).subscribe(res=>{
      if(res.status=='SUCCESS') {
        this.openDialog(JSON.stringify(res.response));
        window.location.reload();
      } else {
        this.openDialog(JSON.stringify(res.response));
      }
    })
  }
  rejectreq(reqId:any) {
    this.ps.rejectRequest(reqId).subscribe(res=>{
      if(res.status=='SUCCESS') {
        this.openDialog(JSON.stringify(res.response));
        window.location.reload();
      } else {
        this.openDialog(JSON.stringify(res.response));
      }
    })
  }

}
