import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { User } from '../index';
import { ApiService } from '../../shared';

@Injectable()
export class AdminService extends ApiService{

  public listUsers(): Observable<User[]> {
    return this.request('GET', 'user');
  }

  public getUserById(id: number): Observable<User> {
    return this.request('GET', 'user/'+ id);
  }

  public update(user: User): Observable<User> {
    return this.request('PATCH', 'user/' + user.id, user);
  } 

  public delete(user: User): Observable<User> {
    return this.request('DELETE', 'user/' + user.id, user);
  }

}
