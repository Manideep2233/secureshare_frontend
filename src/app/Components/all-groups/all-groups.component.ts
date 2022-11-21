import { Component, OnInit } from '@angular/core';
import { DefaultService } from 'src/app/services/default.service';
import { groups_list } from 'src/app/Models/groups_list';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DisplayDialogComponent } from '../display-dialog/display-dialog.component';
@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit {
  groupsList:groups_list[]=[]
  constructor(private router:Router,private ps:DefaultService,public dialog: MatDialog) { }

  ngOnInit(){
    let token=localStorage.getItem("token");
    if(token=='' || token== undefined || token== null) {
      this.openDialog("Unauthorized! Please Login Again");
      this.router.navigate(['']);
      return;
    }
    // this.groupsList=["Group1","Group2","Group3","Group4","Group5"];
    this.ps.exploreGroups().subscribe(res=>{
      let jsonObj = JSON.parse(JSON.stringify(res.response)); // string to "any" object first
      let employee = jsonObj as groups_list[];
      this.groupsList=employee;
      // console.log(this.groupsList);
    })
  }

  requestGroup(groupid:any) {
    // console.log(groupid,typeof(groupid));
    this.ps.requestGroup(groupid).subscribe(res=>{
      if(res.status=='SUCCESS') {
        this.openDialog(res.response);
      }
    })
  }
  openDialog(msg:any) {
    const dialogRef = this.dialog.open(DisplayDialogComponent, {
      width: '250px',
      data:msg
    });
    dialogRef.afterClosed().subscribe(res=>{
      window.location.reload();
    });
  }
}
