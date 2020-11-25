import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private toastyService: ToastyService,
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
                console.log(info);
                this.spinner.hide();
                if (info && info.type === 'admin') {
                  this.success('Login success');
                  localStorage.setItem('uid', data.uid);
                  this.router.navigate(['']);
                } else {
                  this.error('access denied');
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
    const toastOptions: ToastOptions = {
      title: 'Error',
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
    };
    this.toastyService.error(toastOptions);
  }

  success(message) {
    const toastOptions: ToastOptions = {
      title: 'Success',
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
    };
    this.toastyService.success(toastOptions);
  }
}
