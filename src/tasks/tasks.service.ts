import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './repositories/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const foundTask = await this.taskRepository.findOne(id);

    if (!foundTask) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }

    return foundTask;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<void> {
    const res = await this.taskRepository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException(`Task with "${id}" not found.`);
    }
  }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { description, title } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     description,
  //     status: TaskStatus.OPEN,
  //     title: title,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
  //   const { description, title, status } = updateTaskDto;
  //   const task = this.getTaskById(id);
  //   if (title) {
  //     task.title = title;
  //   }
  //   if (description) {
  //     task.description = description;
  //   }
  //   if (status) {
  //     task.status = status;
  //   }
  //   return task;
  // }
  // deleteTask(id: string): Task {
  //   const task = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((t) => t.id !== id);
  //   return task;
  // }
}
