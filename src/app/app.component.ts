import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';


export interface DialogProfileData {
  picture: string;
  name: string;
  email:string;

}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document,public dialog: MatDialog) {}


  logout(): void {

    this.auth.logout({ returnTo: this.doc.location.origin })
  }

  showProfile(picture:string, name:string, email:string) {
    
    this.openDialog(picture, name, email).subscribe(result => {
      if(result != null) {
        this.logout();
      }
    });
  }

  openDialog(picture:string, name:string, email:string): Observable<any>{
    
    const dialogRef = this.dialog.open(DialogShowProfile, {
      width: '250px',
      height: '350px',
      data: {picture, name, email},
      panelClass: 'showProfile'

    });

    return dialogRef.afterClosed();
    
  }
}



@Component({
  selector: 'dialog-show-profile',
  templateUrl: 'dialog-show-profile.html',
})
export class DialogShowProfile {

  constructor(
    public dialogRef: MatDialogRef<DialogShowProfile>,
    @Inject(MAT_DIALOG_DATA) public data: DialogProfileData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}