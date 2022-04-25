import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { TASKS } from '../mock-tasks';
import { Task } from '../Task';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    // const tasks = of(TASKS);
    // return tasks;
    return this.http.get<Task[]>(this.apiUrl);
  }

  // getTasks(): Task[] {
  //   return TASKS;
  // }

  deleteTask(task: Task): Observable<Task> {
    const deleteTaskUrl = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(deleteTaskUrl);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const updateTaskReminderUrl = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(updateTaskReminderUrl, task, httpOptions);
  }

  addNewTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
