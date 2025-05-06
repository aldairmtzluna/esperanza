import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { User } from '../models/user'; 

// user.service.ts
@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:5105/api/user';

  constructor(private http: HttpClient) {}

  getUsers() { return this.http.get<User[]>(`${this.apiUrl}/users/top`); }
  getUser(id: number) { return this.http.get<User>(`${this.apiUrl}/${id}`); }
  addUser(user: User) { return this.http.post<User>(this.apiUrl, user); }
  updateUser(user: User) { return this.http.put(`${this.apiUrl}/${user.id}`, user); }
  deleteUser(id: number) { return this.http.delete(`${this.apiUrl}/${id}`); }
  getUserTop() { return this.http.get(`${this.apiUrl}/user/top10`)} 
}