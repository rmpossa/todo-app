import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchTaskComponent } from './search-task/search-task.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [

  { path: 'todoList', component: TaskListComponent },
  { path: 'search', component: SearchTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
