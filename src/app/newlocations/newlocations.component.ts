import { Component, OnInit } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ApisService } from '../services/apis.service';
import { ToastyService, ToastData, ToastOptions } from 'ng2-toasty';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-newlocations',
  templateUrl: './newlocations.component.html',
  styleUrls: ['./newlocations.component.css'],
})
export class NewlocationsComponent implements OnInit {
  location: any;
  lat: any;
  lng: any;
  address: any;
  constructor(
    private api: ApisService,
    private toastyService: ToastyService,
    private spinner: NgxSpinnerService,
    private navCtrl: Location
  ) {}

  ngOnInit() {}
  public handleAddressChange(address: Address) {
    console.log(address);
    this.location = address.name;
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();
    console.log('=>', this.lng);
  }

  error(message) {
    const toastOptions: ToastOptions = {
      title: 'Error',
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      },
    };
    // Add see all possible types in one shot
    this.toastyService.error(toastOptions);
  }
  success(message) {
    const toastOptions: ToastOptions = {
      title: 'Success',
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      },
    };
    // Add see all possible types in one shot
    this.toastyService.success(toastOptions);
  }

  create() {
    if (!this.location || this.location === '' || !this.lat || !this.lng) {
      this.error('Please select valid location name');
      return false;
    }
    const id = Math.floor(100000000 + Math.random() * 900000000);
    const param = {
      name: this.location,
      status: 'active',
      id: id.toString(),
      lat: this.lat,
      lng: this.lng,
    };
    console.log('ok', param, id.toString());
    this.spinner.show();
    this.api
      .addLocation(id.toString(), param)
      .then((data) => {
        this.spinner.hide();
        console.log(data);
        this.api.alerts('Success', 'Location Added', 'success');
        this.navCtrl.back();
      })
      .catch((error) => {
        this.spinner.hide();
        console.log(error);
        this.error('Something went wrong');
      });
  }
}