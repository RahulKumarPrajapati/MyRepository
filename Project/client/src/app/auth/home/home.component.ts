import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private http: HttpClient) { }

  hastoken = false;
  token : any;
  isauthenticated = false;
  message = '';
  user:any;
  taskData: any;
  createTask = false;
  deleteTask = false;
  editTask = false;
  ngOnInit(): void {
    this.token = this.userService.getToken();
    if(this.token){
      if(this.userService.isLoggedIn()){
        this.isauthenticated = true;
        this.user =  this.userService.getUserPayload();
        this.message = 'Hi '+ this.user.username+ ' your are '+this.user.role;
        if(this.user.role == 'builder'){
          this.createTask = true;
          this.editTask = true;
          this.http.get('http://localhost:3000/api/task/findTaskById/'+this.user._id).subscribe(
            res => {
              this.taskData = res
            },
            err => {
              this.taskData = {"response":{}}
            }
          )
        }
        else if(this.user.role == 'admin'){
          this.deleteTask = true;
          this.http.get('http://localhost:3000/api/task/findAllTask').subscribe(
            res => {
              this.taskData = res
            },
            err => {
              this.taskData = {"response":{}}
            }
          )
        }
        else if(this.user.role == 'architect'){
          this.editTask = true;
          this.http.get('http://localhost:3000/api/task/findMyTask/'+this.user._id).subscribe(
            res => {
              this.taskData = res
            },
            err => {
              this.taskData = {"response":{}}
            }
          )
        }

      }
      else{
        this.router.navigateByUrl('/login');
      }
      
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }


}
