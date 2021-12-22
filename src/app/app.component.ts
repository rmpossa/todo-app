import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { environment as env} from '../environments/environment';


export interface DialogProfileData {
  picture: string;
  name: string;
  email:string;

}

export interface InfoData {
  name: string;
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

    this.auth.logout({ returnTo: this.doc.location.origin + env.auth0RedirectUriSuffix})
  }

  showProfile(picture:string, name:string, email:string) {
    
    this.openDialog(picture, name, email).subscribe(result => {
      if(result != null) {
        this.logout();
      }
    });
  }

  showInfo() {
    
    this.openDialogInfo().subscribe(result => {});
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

  openDialogInfo(): Observable<any>{
    
    const dialogRef = this.dialog.open(DialogInfo, {
      width: '500px',
      height: '500px',
      data: {name: ""},
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

@Component({
  selector: 'info',
  templateUrl: 'info.html',
})
export class DialogInfo {

  constructor(
    public dialogRef: MatDialogRef<DialogInfo>,
    @Inject(MAT_DIALOG_DATA) public data: InfoData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}