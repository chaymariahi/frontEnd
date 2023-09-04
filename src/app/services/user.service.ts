import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  

  private getUrl:string  = "http://localhost:9090/api/v1/users" ;

  constructor(private _httpClient: HttpClient) { }

  getUsers(): Observable <User[]>{
    return this._httpClient.get<User[]>(this.getUrl).pipe(
      map(response => response)
    )
  }
  saveUser(user: User): Observable<User>{
    return this._httpClient.post<User>(this.getUrl, user);
  }

  getUser(id: number): Observable<User> {
    return this._httpClient.get<User>(`${this.getUrl}/${id}`).pipe(
      map(response => response) 
    );
  }

  deleteUser(id:number): Observable<any>{
    return this._httpClient.delete(`${this.getUrl}/${id}`,{responseType:'text'});
  }
}
