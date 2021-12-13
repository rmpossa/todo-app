import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Task } from './task';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { TaskService } from '../services/task.service';


export interface DialogData {
  title: string;
  name: string;
  description: string;

}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks:Task[]= []

  doneTasks:Task[]= []
  
  constructor(private _notificationBar: MatSnackBar, public dialog: MatDialog, private cdRef: ChangeDetectorRef, private taskService: TaskService) {}

  openSnackBar(message:string) {
    this._notificationBar.open(message, null, {
      duration: 2000,
      panelClass: ['snackbar']
    });
  }

  ngOnInit(): void {
    this.listUndoneTasks();
    this.listDoneTasks();
  }

  listUndoneTasks() {
    this.taskService.getTasks(false).subscribe((tasks:Task[]) => this.tasks = tasks);
  }

  listDoneTasks() {
    this.taskService.getTasks(true).subscribe((tasks:Task[]) => this.doneTasks = tasks);
  }


  done(task:Task) {
    task.done = true;
    this.taskService.updateTask(task).subscribe((task:Task) => {
      this.listDoneTasks();
      this.listUndoneTasks();
      this.openSnackBar('Congratulations! Work done');

    });
    
    
  }

  undone(task:Task) {
    task.done = false;
    this.taskService.updateTask(task).subscribe((task:Task) => {
      this.listDoneTasks();
      this.listUndoneTasks();
      this.openSnackBar('More work to-do! Work undone');

    });
  }

  edit(task:Task) {
    this.openDialog(task).subscribe(result => {
      if(result != null) {
        task.name = result.name;
        task.description = result.description;

        this.taskService.updateTask(task).subscribe((task:Task) => {
          this.listDoneTasks();
          this.listUndoneTasks();
          this.cdRef.detectChanges();
          this.openSnackBar('Task updated!');
        });
      }
    });
  }

  add() {
    
    this.openDialog().subscribe(result => {
      if(result != null) {
        let task:Task = {id:0, name:result.name, description:result.description, done:false};
        this.taskService.createTask(task).subscribe((task:Task) => {
          this.listUndoneTasks();
          this.cdRef.detectChanges();
          this.openSnackBar('Task added!');
        });
      }
    });
  }

  remove(task: Task) {
    this.taskService.removeTask(task).subscribe(() => {
      this.listDoneTasks();
      this.openSnackBar('Task removed!');
    });



    this.doneTasks = this.doneTasks.filter((t) => t.id != task.id );
    
  }

  openDialog(task?:Task): Observable<any>{
    let title = 'Edit Task';
    if(task == null) {
      task = {id:0, name:"", description:"", done:false}
      title = 'New Task';
    }
    const dialogRef = this.dialog.open(DialogEditTask, {
      width: '400px',
      height: '400px',
      data: {title, name: task.name, description: task.description},
      

    });

    return dialogRef.afterClosed();
    
  }


  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      if(event.previousContainer.id === 'todoList') {
        this.done(event.container.data[event.currentIndex]);
        this.openSnackBar('Congratulations! Work done');
      } else {
        this.undone(event.container.data[event.currentIndex]);
        this.openSnackBar('More work to-do! Work undone');
      }
    }


    
  }

}

@Component({
  selector: 'dialog-edit-task',
  templateUrl: 'dialog-edit-task.html',
})
export class DialogEditTask {

  constructor(
    public dialogRef: MatDialogRef<DialogEditTask>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}