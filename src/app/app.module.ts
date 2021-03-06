import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, DialogInfo, DialogShowProfile } from './app.component';
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
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { CustomHttpInterceptor } from './interceptors/http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    DialogEditTask,
    SearchTaskComponent,
    DialogShowProfile,
    DialogInfo
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
      domain: env.domain,
      clientId: env.clientId,
      redirectUri: window.location.origin + env.auth0RedirectUriSuffix,
      audience: env.audience,
      httpInterceptor: {
        allowedList: [`${env.serverUrl}/*`],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
