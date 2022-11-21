import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SecureProg';
  manage:boolean=false;
  timer4Updates:any;
  constructor(private cd:ChangeDetectorRef) {

  }
  ngOnInit() {

// this.timer4Updates = setInterval(() => {
//   this.cd.detectChanges();
// }, 150);
    this.timer4Updates = setInterval(() => {
    let role = localStorage.getItem("role");
    if(role == '"ADMIN"') {
      this.manage=true;
      this.cd.detectChanges();
      return;
    }
},1);
this.timer4Updates;
}
}
