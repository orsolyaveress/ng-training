import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { User } from '../../user/';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let user: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    user = new User();
    user.email = 'test@example.com';
    user.password = 'secret';
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('can login', done => {
    authService.login(user).subscribe(
      response => {
        expect(response['user']).toEqual({email: 'test@example.com', password: 'secret'});
        expect(response['token']).toBe('someToken');

        expect(localStorage.getItem('user')).toBe('{"email":"test@example.com","password":"secret"}');
        expect(localStorage.getItem('token')).toBe('someToken');
        done();
      }
    );
    const loginRequest = httpMock.expectOne(environment.apiEndpoint + '/auth');
    loginRequest.flush({user: {email: 'test@example.com', password: 'secret'}, token: 'someToken'});
  });

  it('can logout', () => {
    authService.user = user;
    authService.token = 'someToken';
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'someToken');
    authService.logout();

    expect(authService.user).toBe(undefined);
    expect(authService.token).toBe(undefined);
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  })

});
