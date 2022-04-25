import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskSerevice: TaskService) {}

  ngOnInit(): void {
    // this.tasks = this.taskSerevice.getTasks();
    this.taskSerevice.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onDeleteTask(task: Task) {
    this.taskSerevice.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskSerevice.updateTaskReminder(task).subscribe();
  }

  addtask(task: Task) {
    this.taskSerevice.addNewTask(task).subscribe((task) => {
      this.tasks.push({ ...task, id: this.tasks.length + 1 });
    });
  }
}
