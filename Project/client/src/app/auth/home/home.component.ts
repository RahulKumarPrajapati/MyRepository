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
  message = 'Hi ';
  user:any;
  ngOnInit(): void {
    this.token = this.userService.getToken();
    if(this.token){
      if(this.userService.isLoggedIn()){
        this.isauthenticated = true
        this.user =  this.userService.getUserPayload();
        this.message = 'Hi '+ this.user.username+ ' your are '+this.user.role;
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
