import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RegistrationComponent, User } from '../../index';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/index';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private __adminService: AdminService, private _router: Router, private _authService: AuthService) { }

  public user: User = new User();
  public form = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    },
    UpdateComponent.passwordMatchValidator
  );

  public static passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value ? null : { 'mismatch': true };
  }

  ngOnInit() {
    let id = this._route.snapshot.paramMap.get('id');
    this.__adminService.getUserById(Number(id).valueOf()).subscribe(
      user => {
        this.user = user;
      },
      error => {
        console.log(error);
      }
    );
  }

  update() {
    this.__adminService.update(this.user).subscribe(
      updatedUser => {
        window.alert("Succesfully update!");
        if (this._authService.isAdmin()) {
          this._router.navigate(["/user/admin"]);
        } else {         
          this._router.navigate(["/"]);
      }          
      },
      error => {
        this._router.navigate(["/"]);
      }
    );
  }

}
