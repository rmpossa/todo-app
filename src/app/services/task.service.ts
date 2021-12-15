import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../task-list/task';
import { Tasks } from './tasks';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  URL_BASE = env.taskApiBackendUrl;

  getTasks(done: boolean) {
    return this.http.get<Task[]>(`${this.URL_BASE}/tasks/?done=${done}`);
  }

  getAllTasks() {
    return this.http.get<Task[]>(`${this.URL_BASE}/tasks/`);
  }

  createTask(task: Task) {
    return this.http.post<Task>(`${this.URL_BASE}/tasks/`, task);
  }

  removeTask(task: Task) {
    return this.http.delete(`${this.URL_BASE}/tasks/task/${task.id}`);
  }

  updateTask(task: Task) {
    return this.http.put<Task>(`${this.URL_BASE}/tasks/task/${task.id}`, task);
  }

  filterTasks(term: string, page: number, sort: string, order: string) {
    let termExpression = '';
    if (term) {
      termExpression = `term=${term}&`;
    }
    return this.http.get<Tasks>(`${this.URL_BASE}/tasks/filter?${termExpression}page=${page + 1}&sort=${sort}&order=${order}`);
  }



}
