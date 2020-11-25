import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../services/apis.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  locations: any;
  dummy = Array(50);
  constructor(
    private router: Router,
    private api: ApisService,
    private spinner: NgxSpinnerService
  ) {
    this.getLocation();
  }

  ngOnInit() {}
  getLocation() {
    this.api
      .getLocations()
      .then((data) => {
        console.log(data);
        this.locations = data;
        this.dummy = [];
      })
      .catch((error) => {
        console.log(error);
        this.dummy = [];
      });
  }
  createNew() {
    this.router.navigate(['admin-newlocations']);
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'To ' + text + ' this location!',
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
          .updateLocation(item)
          .then(
            (data) => {
              this.spinner.hide();
              this.getLocation();
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
  delete(item) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'To delete this location!',
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
        this.spinner.show();
        this.api
          .deleteLocation(item)
          .then(
            (data) => {
              this.spinner.hide();
              this.getLocation();
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
}
