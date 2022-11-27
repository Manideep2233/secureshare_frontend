import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/Models/register';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { baseResponse } from '../../Models/baseResponse';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { DefaultService } from 'src/app/services/default.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DisplayDialogComponent } from '../display-dialog/display-dialog.component';
import { login_ouput } from 'src/app/Models/login_ouput';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regForm:any;
  showbar:boolean=false;
  constructor(private fb:FormBuilder,private ps:DefaultService,public dialog: MatDialog,private router:Router) { }

  ngOnInit() {
    this.regForm= this.fb.group({
      fullname: ['', [Validators.required]],
      UserName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
    });
  }
  regUser() {
    this.showbar = true;
    let temp:Register={};
    temp.fullName=this.regForm.get('fullname').value;
    temp.username=this.regForm.get('UserName').value;
    temp.password=this.regForm.get('password').value;
    temp.confirmPassword=this.regForm.get('repassword').value;
    temp.email=this.regForm.get('email').value;
    this.ps.save(temp).subscribe(res=>{
      this.showbar=false;
      if(res.status=='SUCCESS') {
        this.openDialog("Registered Successfully");
        // let jsonObj = JSON.parse(JSON.stringify(res.response)); // string to "any" object first
        // let employee = jsonObj as login_ouput;
        // this.ps.saveAuthData(JSON.stringify(employee.jwt))
        this.router.navigate(['/login']);
      } else {
        this.openDialog(JSON.stringify(res.response));
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
