import { Component, OnInit } from '@angular/core';
import { UpdateUser } from 'src/app/Models/updateUser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { baseResponse } from '../../Models/baseResponse';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { DefaultService } from 'src/app/services/default.service';
import { my_profile_res } from 'src/app/Models/my_profile_res';
import { DisplayDialogComponent } from '../display-dialog/display-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  updateForm:any;
  userId:any;
  updateFlag:boolean=false;
  constructor(private fb:FormBuilder,private ps:DefaultService,public dialog: MatDialog,private router: Router) { }

  ngOnInit() {
    this.updateForm= this.fb.group({
      fullname: ['', [Validators.required]],
      UserName: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
    });
    this.ps.getProfile().subscribe(res=>{
      let jsonObj = JSON.parse(JSON.stringify(res.response)); // string to "any" object first
      let employee = jsonObj as my_profile_res;
      this.userId=employee.id;
      this.updateForm.controls['UserName'].setValue(employee.username);
      this.updateForm.controls['fullname'].setValue(employee.fullName);
      this.updateForm.controls['email'].setValue(employee.email);
    });
  }
  editProfile() {
    let temp:UpdateUser={}
    temp.userId=this.userId;
    temp.fullName=this.updateForm.get('fullname').value;
    temp.email=this.updateForm.get('email').value;
    temp.username=this.updateForm.get('UserName').value;
    // temp.password=this.updateForm.get('UserName').value;
    this.ps.updateProfile(temp).subscribe(res=>{
      if(res.status=='SUCCESS') {
        this.openDialog("Upated Successfully..Logging you out Please Login again.");
        setTimeout(() => {
          this.router.navigate(['./logout']);
        }, 3000);
      } else {
        this.openDialog(JSON.stringify(res.response));
      }
    });
  }
  openDialog(msg:any) {
    const dialogRef = this.dialog.open(DisplayDialogComponent, {
      width: '250px',
      data:msg
    });
  }

  specialCharaters(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 33 && charCode<=47) || (charCode >= 58 && charCode<=63) || (charCode >= 91 && charCode<=96) ||
    (charCode >= 123 && charCode<=126) ) {
      return false;
    }
    return true;

  }

  handlePaste(event:any){
      event.preventDefault();
  }
  
}
