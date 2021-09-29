import { TaskService } from '../services/task.service';
import { Task } from '../task-list/task';
import {Component, ViewChild, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf, fromEvent } from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { Tasks } from '../services/tasks';


@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent implements OnInit, AfterViewInit {

  tasks:Tasks = null;
  displayedColumns: string[] = ['name', 'description', 'done'];
  term:string = '';

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input', { static: true }) filterInput: ElementRef;

  observableFilter:Observable<KeyboardEvent>;
  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    this.observableFilter = fromEvent(this.filterInput.nativeElement, 'keyup')
  }
    

  ngAfterViewInit(): void {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.observableFilter.subscribe(() => this.paginator.pageIndex = 0);
    
    merge(this.sort.sortChange, this.paginator.page, this.observableFilter)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          
          return this.taskService.filterTasks(this.term, this.paginator.pageIndex, this.sort.active, this.sort.direction)
            .pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;
          
          if (data === null) {
            return [];
          }
          
          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.count;
          return data.tasks;
        })
      ).subscribe(data => this.tasks = data);
  }

  

}
