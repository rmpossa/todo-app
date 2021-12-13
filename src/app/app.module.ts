import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, DialogShowProfile } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogEditTask, TaskListComponent } from './task-list/task-list.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule }   from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SearchTaskComponent } from './search-task/search-task.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { AuthModule } from '@auth0/auth0-angular';



@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    DialogEditTask,
    SearchTaskComponent,
    DialogShowProfile
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    ScrollingModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    DragDropModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    AuthModule.forRoot({
      domain: 'rmpossatodolist.us.auth0.com',
      clientId: 'Sf60X5nHtiHIWAR3nB8h4wIfu29FIa4T',
      redirectUri: window.location.origin,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
