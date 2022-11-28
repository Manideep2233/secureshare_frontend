import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DefaultService } from 'src/app/services/default.service';
import { groups_list } from 'src/app/Models/groups_list';
import { post_list } from 'src/app/Models/post_list';
import { DomSanitizer } from '@angular/platform-browser';
import { post_comment } from 'src/app/Models/post_comment';
import { Comment } from 'src/app/Models/comment';
import { CreateGroup } from 'src/app/Models/createGroup';
import { DisplayDialogComponent } from '../display-dialog/display-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResponseObject } from 'src/app/Models/responseObject';
@Component({
  selector: 'app-my-feeds',
  templateUrl: './my-feeds.component.html',
  styleUrls: ['./my-feeds.component.scss']
})
export class MyFeedsComponent implements OnInit {
  postForm: any;
  addcomm2: any;
  enablecomment: boolean[] = [];
  all_enablecomment: boolean[] = [];
  groupsList: groups_list[] = [];
  specificPosts: post_list[] = [];
  allPosts_list: post_list[] = [];
  default: boolean = true;
  counter = 0;
  selectedGroup: any;
  fileName: any;
  addcomm: any;
  view: boolean[] = [];
  all_view: boolean[] = [];
  formData = new FormData();
  Posts = ["Hi there", "Hello", "Hey", "hi", "Bye"]
  fileUrl: any;
  createGroup: any;
  constructor(private fb: FormBuilder, private ps: DefaultService, private sanitizer: DomSanitizer, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    let token = localStorage.getItem("token");
    if (token == '' || token == undefined || token == null) {
      this.openDialog("Unauthorized! Please Login Again");
      this.router.navigate(['']);
      return;
    }
    this.postForm = this.fb.group({
      post: ['', [Validators.required]],
      message: ['', Validators.required]
    });
    this.createGroup = this.fb.group({
      groupName: ['', [Validators.required]],
      groupDescription: ['', Validators.required]
    });
    this.ps.allUserGroups().subscribe(res => {
      if (res.status == 'SUCCESS') {
        let jsonObj = JSON.parse(JSON.stringify(res.response)); // string to "any" object first
        let employee = jsonObj as groups_list[];
        this.groupsList = employee;
      }
    })
    this.addcomm = this.fb.group({
      currcomment: ['', Validators.required]
    });
    this.addcomm2 = this.fb.group({
      currcomment2: ['', Validators.required]
    });
    this.getAllPosts();
  }
  groupSpecific(group: any) {
    this.default = false;
    this.selectedGroup = group;
    this.ps.getAllGroupPosts(group.id).subscribe(res => {
      if (res.status == 'SUCCESS') {
        let jsonObj = JSON.parse(JSON.stringify(res.response)); // string to "any" object first
        let employee = jsonObj as post_list[];
        this.specificPosts = employee;
        for (let i = 0; i < this.specificPosts.length; i++) {
          this.enablecomment[i] = false;
          this.view[i] = true;
        }
      }
    });
  }
  getAllPosts() {
    this.default = true;
    this.ps.getProfilePosts().subscribe(res => {
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
  useraddPost() {
    let msg = this.postForm.get('message').value;
    // console.log(msg, this.selectedGroup, this.selectedGroup.id)
    this.ps.createpost(msg, this.selectedGroup.id, this.formData).subscribe(res => {
      let jsonObj = JSON.parse(JSON.stringify(res)); // string to "any" object first
      let employee = jsonObj as ResponseObject;
      if (employee.status == 'SUCCESS') {
        this.openDialog("Posted Successfully");
        window.location.reload();
      } else {
        
        this.openDialog(employee.response);
      }
    })
  }
  onFileSelected(event: any) {
    let formData_new=new FormData;
    this.formData=formData_new;
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.formData.append("file", file);
      // const upload$ = this.http.post("/api/thumbnail-upload", formData);
      // upload$.subscribe();
    }
  }
  getfile(postid: any,filename:any) {
    this.ps.fileOfPost(postid).subscribe(res => {
      // let url = window.URL.createObjectURL(res);
      // let a = document.createElement('a');
      // document.body.appendChild(a);
      // a.setAttribute('style', 'display: none');
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
      var anchor = document.createElement("a");
      anchor.download = filename;
      anchor.href = url;
      anchor.click();
    });

    // downloadFile(data: Response) {
    //   const blob = new Blob([data], { type: 'text/csv' });
    //   const url= window.URL.createObjectURL(blob);
    //   window.open(url);
    // }
  }
  // saveAsBlob(data: Blob){
  //   var blob = new Blob([data], { type: 'application/octet-stream' });
  //   var url= window.URL.createObjectURL(blob);
  //   window.
  // }
  // saveAsBlob(data: any) {
  //   const blob = new Blob([data._body],
  //   const file = new File([blob], 'image.png',
  //   FileSaver.saveAs(file);
  //  }
  getcomments(comments: post_comment[]) {

  }
  addcomm1(postid: string) {
    let temp: Comment = {}
    temp.message = this.addcomm.get('currcomment').value;
    temp.postId = postid;
    // console.log(temp);
    this.ps.addComment(temp).subscribe(res => {
      if (res.status == 'SUCCESS') {
        this.openDialog(res.response);
        this.addcomm.controls['currcomment'].setValue('');
        window.location.reload();
      } else {
        this.openDialog("Something Went Wrong!!");
      }
    })
  }
  add_comm2(postid: string) {
    let temp: Comment = {}
    temp.message = this.addcomm2.get('currcomment2').value;
    temp.postId = postid;
    // console.log(temp);
    this.ps.addComment(temp).subscribe(res => {
      if (res.status == 'SUCCESS') {
        this.openDialog(res.response);
        this.addcomm2.controls['currcomment2'].setValue('');
        window.location.reload();
      } else {
        this.openDialog("Something Went Wrong!!");
      }
    })
  }
  viewComments(postid: string, index: number) {
    this.view[index] = false;
    this.enablecomment[index] = true;
  }
  HideComments(index: number) {
    this.view[index] = true;
    this.enablecomment[index] = false;
  }
  viewComments_2(postid: string, index: number) {
    this.all_view[index] = false;
    this.all_enablecomment[index] = true;
  }
  HideComments_2(index: number) {
    this.all_view[index] = true;
    this.all_enablecomment[index] = false;
  }
  create_Group() {
    let temp: CreateGroup = {};
    temp.groupName = this.createGroup.get('groupName').value;
    temp.groupDescription = this.createGroup.get('groupDescription').value;
    this.ps.createGroup(temp).subscribe(res => {
      if (res.status == 'SUCCESS') {
        this.openDialog(res.response);
        this.createGroup.get('groupName').setValue('');
        this.createGroup.get('groupDescription').setValue('');
        window.location.reload();
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
