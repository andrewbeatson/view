import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  constructor(
    private api: ApisService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.getUsers();
  }

  ngOnInit() {}

  getUsers() {
    this.users = [];
    this.api
      .getUsers()
      .then(
        (data) => {
          data.forEach((element) => {
            if (element.type === 'user') {
              this.users.push(element);
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

  search(string) {
    this.resetChanges();
    this.users = this.filterItems(string);
  }

  protected resetChanges = () => {};

  setFilteredItems() {
    this.users = [];
  }

  filterItems(searchTerm) {
    return this.users.filter((item) => {
      return item.fullname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  createNew() {
    const navData: NavigationExtras = {
      queryParams: {
        register: true,
      },
    };
    this.router.navigate(['admin-newuser'], navData);
  }
  getClass(item) {
    if (item === 'active') {
      return 'btn btn-primary btn-round';
    } else if (item === 'deactive') {
      return 'btn btn-danger btn-round';
    }
    return 'btn btn-warning btn-round';
  }

  changeStatus(item) {
    const text = item.status === 'active' ? 'deactive' : 'active';
    console.log(text);
    Swal.fire({
      title: 'Are you sure?',
      text: 'To ' + text + ' this user!',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'Cancle',
      backdrop: false,
      background: 'white',
    }).then((data) => {
      if (data && data.value) {
        console.log('update it');
        item.status = text;
        console.log(item);
        this.spinner.show();
        this.api
          .updateProfile(item.uid, item)
          .then(
            (data) => {
              this.spinner.hide();
              this.getUsers();
            },
            (error) => {
              console.log(error);
              this.spinner.hide();
            }
          )
          .catch((error) => {
            this.spinner.hide();
            console.log(error);
          });
      }
    });
  }
  openUser(item) {
    const navData: NavigationExtras = {
      queryParams: {
        id: item.uid,
        register: false,
      },
    };
    this.router.navigate(['admin-newuser'], navData);
  }
}
