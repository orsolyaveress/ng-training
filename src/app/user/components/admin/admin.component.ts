import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../index';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users: User[];
  @Output() public error = new EventEmitter();
  @Output() public delete = new EventEmitter<User>();

  constructor(private _adminService: AdminService) { }

  ngOnInit() {
   this.loadUsers(); 
  }

  public loadUsers() {
    this._adminService.listUsers().subscribe(
      users => {
        this.users = users;
      }
    );
  }

  public updateUser(user: User) {
    this._adminService.update(user).subscribe(
      updatedUser => {
        user = updatedUser;
        this.loadUsers();
      },
      error => {
        this.error.emit();
      }
    );
  }

  public deleteUser(user: User) {
    this._adminService.delete(user).subscribe(
      () => {
        this.delete.emit(user);
        this.loadUsers();
      },
      error => {
        this.error.emit();
      }
    )
  }
}
