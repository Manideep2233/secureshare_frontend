import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UpdateLimit } from 'src/app/Models/updateLimit';
import { UploadRequest } from 'src/app/Models/uploadRequest';
import { UserGroup } from 'src/app/Models/userGroup';
import { DefaultService } from 'src/app/services/default.service';
import { DisplayDialogComponent } from '../display-dialog/display-dialog.component';

@Component({
  selector: 'app-dialog-cont',
  templateUrl: './dialog-cont.component.html',
  styleUrls: ['./dialog-cont.component.scss']
})
export class DialogContComponent implements OnInit {
  updateForm:any;
  Id:any;
  // groupId:any;
  constructor(private fb:FormBuilder,
    private ps:DefaultService,
    public dialog: MatDialog,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {alert(this.data);
    this.Id=this.data[1];
    this.updateForm= this.fb.group({
      newSize: ['', [Validators.required, Validators.email]],
    });
  }
  update(){
    if(this.data[0]=='user') {
      let item:UpdateLimit={};
      item.id=this.Id;
      item.updateSize=this.updateForm.get('newSize').value;
      this.ps.updateLimit(item).subscribe(res=>{
        if(res.status=='SUCCESS') {
          this.openDialog("Updated Successfully");
        } else {
          this.openDialog("Something Wrong!!");
        }
      });
    } else {
      let item:UploadRequest={};
      item.id=this.Id;
      item.updateSize=this.updateForm.get('newSize').value;
      this.ps.updateLimit1(item).subscribe(res=>{
        if(res.status=='SUCCESS') {
          this.openDialog("Updated Successfully");
        } else {
          this.openDialog("Something Wrong!!");
        }
      });
    }
  }
  openDialog(msg:any) {
    const dialogRef = this.dialog.open(DisplayDialogComponent, {
      width: '250px',
      data:msg
    });
    dialogRef.afterClosed().subscribe(res=>{
    this.router.navigate(['./manage']);
    });
  }

}
