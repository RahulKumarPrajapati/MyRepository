import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:3000/";

  login(data: any) {
    return this.http.post(this.url+'api/login',data);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

}
