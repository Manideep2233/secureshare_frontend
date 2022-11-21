import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DisplayDialogComponent } from '../display-dialog/display-dialog.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public dialog: MatDialog,private router:Router) { }

  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.openDialog("Logged Out Successfully!!")
    this.router.navigate(['']);
  }
  openDialog(msg:any) {
    const dialogRef = this.dialog.open(DisplayDialogComponent, {
      width: '250px',
      data:msg
    });
  }

}
