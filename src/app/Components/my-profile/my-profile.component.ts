import { Component, OnInit } from '@angular/core';
import { Route,Router } from '@angular/router';
import { DefaultService } from 'src/app/services/default.service';
import { my_profile_res } from 'src/app/Models/my_profile_res';
import { MatDialog } from '@angular/material/dialog';
import { DisplayDialogComponent } from '../display-dialog/display-dialog.component';
import { post_list } from 'src/app/Models/post_list';
import { Comment } from 'src/app/Models/comment';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  myPosts=[''];
  postComments=[''];
  showComm:boolean=true;
  username:string='';
  Fullname:string='';
  email:string='';
  allPosts_list: post_list[] = [];
  all_view: boolean[] = [];
  all_enablecomment: boolean[] = [];
  view:boolean[]=[];
  fileUrl: any;
  // allPosts_list:post_list[]=[];
  enablecomment:boolean[]=[];
  addcomm2: any;
  constructor(private fb: FormBuilder,private router:Router,private ps:DefaultService,public dialog: MatDialog) { }

  ngOnInit(){
    let token=localStorage.getItem("token");
    if(token=='' || token== undefined || token== null) {
      this.openDialog("Unauthorized! Please Login Again");
      this.router.navigate(['']);
      return;
    }
    this.addcomm2 = this.fb.group({
      currcomment2: ['', Validators.required]
    });
    this.ps.getProfile().subscribe(res=>{
      if(res.status=='SUCCESS') {
        if(res.response != null && res.response != undefined) {
          let jsonObj = JSON.parse(JSON.stringify(res.response)); // string to "any" object first
          let employee = jsonObj as my_profile_res;
          this.username=employee.username;
          this.Fullname=employee.fullName;
          this.email=employee.email;
        }
      }
    })
    this.myPosts=["Post1","Post2","Post3","Post4","Post5"];
    this.postComments=["Good","Bad","Nice","Very Good"];
    this.getAllPosts();
  }
  comments() {
    this.showComm=!this.showComm;
  }
  editProfile() {
    this.router.navigate(['editProfile']);
  }
  getAllPosts() {
    this.ps.getAllUserPosts().subscribe(res => {
      if (res.status == 'SUCCESS') {
        let jsonObj = JSON.parse(JSON.stringify(res.response)); // string to "any" object first
        let employee = jsonObj as post_list[];
        this.allPosts_list = employee;
        for (let i = 0; i < this.allPosts_list.length; i++) {
          this.all_enablecomment[i] = false;
          this.all_view[i] = true;
        }
      }
    });
  }
  addcomm1(postid: string) {
    let temp:Comment = {};
    temp.message = this.addcomm2.get('currcomment2').value;
    temp.postId = postid;
    this.ps.addComment(temp).subscribe(res => {
      if (res.status == 'SUCCESS') {
        this.openDialog(res.response);
        this.addcomm2.controls['currcomment2'].setValue('');
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
  getfile(postid: any) {
    this.ps.fileOfPost(postid).subscribe(res => {
      let url = window.URL.createObjectURL(res);
      // let a = document.createElement('a');
      // document.body.appendChild(a);
      // a.setAttribute('style', 'display: none');
      this.fileUrl = window.location.assign(url);
      // a.href = url;  
      // a.download = "file"
      // a.download = res;
      // a.click();
      window.URL.revokeObjectURL(url);
      // a.remove();
    });

    // downloadFile(data: Response) {
    //   const blob = new Blob([data], { type: 'text/csv' });
    //   const url= window.URL.createObjectURL(blob);
    //   window.open(url);
    // }
  }
  viewComments(index: number) {
    this.all_view[index] = false;
    this.all_enablecomment[index] = true;
  }
  HideComments(index: number) {
    this.all_view[index] = true;
    this.all_enablecomment[index] = false;
  }
  getfile1(postid: any,filename:any) {
    this.ps.fileOfPost(postid).subscribe(res => {
      // let url = window.URL.createObjectURL(res);
      // let a = document.createElement('a');
      // document.body.appendChild(a);
      // // a.setAttribute('style', 'display: none');
      // this.fileUrl = window.location.assign(url);
      // this.fileUrl.href=url;
      // this.fileUrl.download="file"
      // this.fileUrl.download=res;
      // this.fileUrl.download = "file"
      // a.download = res;
      // this.fileUrl.click();
      // window.URL.revokeObjectURL(url);
      // this.fileUrl.remove();
      
      var url = window.URL.createObjectURL(res);
      window.open(url,'_blank');
      // var anchor = document.createElement("a");
      // anchor.download = filename;
      // anchor.href = url;
      // anchor.click();

    });
  }

  specialCharaters(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 33 && charCode<=45) || (charCode >= 58 && charCode<=63) || (charCode >= 91 && charCode<=96) ||
    (charCode >= 123 && charCode<=126) ) {
      return false;
    }
    return true;

  }

  handlePaste(event:any){
      event.preventDefault();
  }

}
