import { Component, OnInit } from '@angular/core';
import { Login } from '../../Models/login.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { baseResponse } from '../../Models/baseResponse';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DefaultService } from 'src/app/services/default.service';
import { DisplayDialogComponent } from '../display-dialog/display-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { login_ouput } from 'src/app/Models/login_ouput';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  mfaForm: any;
  showmfa:boolean=false;
  showbarLogin:boolean=false;
  constructor(private fb: FormBuilder, private ps: DefaultService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      UserName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.mfaForm = this.fb.group({
      otp: ['', [Validators.required]]
    });
  }
  loginUser() {
    this.showbarLogin = true;
    let temp: Login = {}
    temp.username = this.loginForm.get('UserName').value;
    temp.password = this.loginForm.get('password').value;
    const salt = bcrypt.genSaltSync(10);
    let pass = bcrypt.hashSync(this.loginForm.value.password, salt);
    // console.log(pass);
    // console.log(bcrypt.compareSync("Nikhil@1",pass));
    this.ps.login(temp).subscribe(res => {
      this.showbarLogin=false;
      if (res.status == 'SUCCESS') {
        this.showmfa=true;
        this.openDialog(JSON.stringify(res.response));
      } else {
        this.openDialog(JSON.stringify(res.response))
      }
    });
  }
  openDialog(msg: any) {
    const dialogRef = this.dialog.open(DisplayDialogComponent, {
      width: '250px',
      data: msg
    });
  }
  validate() {
    let temp1:Login={};
    temp1.username=this.loginForm.get('UserName').value;
    temp1.password=this.mfaForm.get('otp').value;
    this.ps.validateLogin(temp1).subscribe(res=>{
      if(res.status=='SUCCESS') {
        this.showmfa=false;
        let jsonObj = JSON.parse(JSON.stringify(res.response)); // string to "any" object first
        let employee = jsonObj as login_ouput;
        this.ps.saveAuthData(JSON.stringify(employee.jwt));
        this.ps.saveRoleData(JSON.stringify(employee.role));
        this.router.navigate(['/myFeed']);
      } else {
        this.openDialog(JSON.stringify(res.response));
      }
    });
  }

}
