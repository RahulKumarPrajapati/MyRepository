import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../shared/task/task.model'
import { NgForm,FormGroup, FormControl }  from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private router: Router,private userService: UserService, private http: HttpClient) { }
  serverErrorMsg = '';
  passOrFail = 'danger';
  url = "http://localhost:3000/";  message = '';
  task = new FormGroup({
    taskName: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
    userId: new FormControl(this.userService.getUserPayload()["_id"])

  });
  ngOnInit(): void {
    
  }
  addTask(){
    this.http.post(this.url+'api/task/add',this.task.value).subscribe(
      response => {
        this.router.navigate(['/task/add'])
        this.serverErrorMsg = 'Task added successfully.'; 
        this.passOrFail = 'success'
        this.task.reset();
       },
      err => {
        this.router.navigate(['/task/add'])
        this.serverErrorMsg = 'Some Error Occured! Please Try Again';
        this.passOrFail = 'danger'

      }
    )
  }
}
