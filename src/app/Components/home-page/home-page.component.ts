import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DefaultService } from '../../services/default.service';
import { Route,Router } from '@angular/router';
// import { Login } from '../Models/login.model';
// import { baseResponse } from '../Models/baseResponse';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  loginForm:any;
  regForm:any;
  constructor(private fb:FormBuilder,private ps:DefaultService,private router:Router) { }

  ngOnInit() {
    // this.loginForm= this.fb.group({
    //   UserName: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // });
  //   this.regForm= this.fb.group({
  //     firstname: ['', [Validators.required]],
  //     lastname: ['', [Validators.required]],
  //     UserName: ['', [Validators.required]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     repassword: ['', [Validators.required, Validators.minLength(6)]],
  //     email: ['', [Validators.required,Validators.email]],
  //     gender: ['', [Validators.required]],
  //   });
  // }
  // loginUser() {
  //   let temp:Login={}
  //   temp.username=this.loginForm.get('UserName').value;
  //   temp.password=this.loginForm.get('password').value;
  //   this.ps.login(temp).subscribe(res=>{
  //     alert(res.status);
  //     if(res.status=='SUCCESS') {
  //       alert(res.response)
  //       alert(typeof(res.response))
  //       this.ps.saveAuthData(JSON.stringify(res.response))
  //     }
  //   });
  //   // alert("loggedin")
  }
  redirect(action:any) {
    if(action=='Login') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/Register']);
    }
  }

}
