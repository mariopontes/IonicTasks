import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage implements OnInit {

  tasks: Observable<Array<Task>>;
  constructor() { }

  ngOnInit() {
    this.tasks = of([
      { id: '123s12w', title: 'Aprender Ionic', done: false },
      { id: '123w123', title: 'Aprender FireStore', done: false }
    ])
  }

}
