import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { SearchTaskComponent } from './search-task/search-task.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [

  { path: 'todoList', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchTaskComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
