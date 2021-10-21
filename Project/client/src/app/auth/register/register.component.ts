import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {NgForm,FormControl}  from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  user: User = {
    username: '',
    email: '',
    password: ''
  }
  serverErrorMsg = '';
  url = "http://localhost:3000/";
  ngOnInit(): void {
  }

  getDetails(data:NgForm){
    this.http.post(this.url+'api/register',data).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      err => {
        this.serverErrorMsg = 'All fields are maindatory';
      }
    )
  }
}
