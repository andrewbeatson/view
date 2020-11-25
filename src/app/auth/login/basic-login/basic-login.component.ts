import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss'],
})
export class BasicLoginComponent implements OnInit {
  email: any = '';
  password: any = '';
  constructor(
    private api: ApisService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme3');
  }
  login() {
    if (!this.email || !this.password) {
      return false;
    }
    this.spinner.show();
    this.api
      .login(this.email, this.password)
      .then(
        (data) => {
          this.api
            .getProfile(data.uid)
            .then(
              (info: any) => {
                this.spinner.hide();
                if (info && info.type === 'admin') {
                  Swal.fire({
                    title: 'Welcome ' + info.firstname,
                    text: '',
                    icon: 'success',
                    showConfirmButton: false,
                    showCancelButton: false,
                    backdrop: false,
                    background: 'white',
                    timer: 2000,
                  });
                  localStorage.setItem('uid', data.uid);
                  this.router.navigate(['']);
                } else {
                  this.error('Please contact your administrator');
                }
              },
              (error) => {
                this.spinner.hide();
                this.error(error);
              }
            )
            .catch((error) => {
              this.spinner.hide();
              this.error(error);
            });
        },
        (error) => {
          this.spinner.hide();
          this.error(error);
        }
      )
      .catch((error) => {
        this.spinner.hide();
        this.error(error);
      });
  }

  error(message) {
    Swal.fire({
      title: 'Access Denied',
      text: message,
      icon: 'error',
      showConfirmButton: false,
      showCancelButton: false,
      backdrop: false,
      background: 'white',
      timer: 2000,
    });
  }
}
