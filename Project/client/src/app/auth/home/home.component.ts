import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { TaskComponent } from '../../components/task/task.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, public userService: UserService, private router: Router, private http: HttpClient) { }
  hastoken = false;
  token : any;
  message = '';
  user:any;
  taskData: any;
  createTask = false;
  deleteTask = false;
  editTask = false;
  taskComponent: any;
  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.taskComponent = new TaskComponent(this.route,this.router,this.userService,this.http);
    if(this.token){
      if(this.userService.isLoggedIn()){
        this.userService.isauthenticated = true;
        this.user =  this.userService.getUserPayload();
        this.message = 'Hi '+ this.user.username+ ' your are '+this.user.role;
        if(this.user.role == 'builder'){
          this.createTask = true;
          this.editTask = true;
          this.http.get('http://localhost:3000/api/task/findTaskById/'+this.user._id).subscribe(
            res => {
              this.taskData = res
            }
          )
        }
        else if(this.user.role == 'admin'){
          this.deleteTask = true;
          this.http.get('http://localhost:3000/api/task/findAllTask').subscribe(
            res => {
              this.taskData = res
            }
          )
        }
        else if(this.user.role == 'architect'){
          this.editTask = true;
          this.http.get('http://localhost:3000/api/task/findMyTask/'+this.user._id).subscribe(
            res => {
              this.taskData = res
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

  deleteMyTask(id:any){
    this.taskComponent.delete(id);
  }

}
