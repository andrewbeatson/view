import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApisService } from '../services/apis.service';
import * as moment from 'moment';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  rest: any[] = [];
  users: any[] = [];
  drivers: any[] = [];
  dummy = Array(10);
  constructor(private api: ApisService, private router: Router) {
    this.getRest();
    this.getUsers();
  }

  ngOnInit() {}

  getRest() {
    this.api
      .getVenues()
      .then(
        (data) => {
          this.rest = data;
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }

  getUsers() {
    this.users = [];
    this.drivers = [];
    this.api
      .getUsers()
      .then(
        (data) => {
          data.forEach((element) => {
            if (element.type === 'user') {
              this.users.push(element);
            } else if (element.type === 'delivery') {
              this.drivers.push(element);
            }
          });
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }

  getDates(date) {
    return moment(date).format('llll');
  }

  getClass(item) {
    if (item === 'created' || item === 'accepted' || item === 'picked') {
      return 'btn btn-primary btn-round';
    } else if (item === 'delivered') {
      return 'btn btn-success btn-round';
    } else if (item === 'rejected' || item === 'cancel') {
      return 'btn btn-danger btn-round';
    }
    return 'btn btn-warning btn-round';
  }

  openOrder(item) {
    const navData: NavigationExtras = {
      queryParams: {
        id: item.id,
      },
    };
    this.router.navigate(['admin-orderdetails'], navData);
  }

  getCurreny() {
    return this.api.getCurrecySymbol();
  }
}
