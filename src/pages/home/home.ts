import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
declare var google: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  latitude: any;
  longitude: any;
  coorinates: any = []

  @ViewChild('map') mapRef: ElementRef;
  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public nativeStorage: NativeStorage
  ) {
    this.get()
  }
  doRefresh(refresher) {
   this.get();
    this.nativeStorage.getItem('coordinates')
      .then(
        data => {
          this.coorinates = data
          refresher.complete();
          console.log(this.coorinates);
        },
        error => {
          console.error(error)
          refresher.complete()
        }
      );

  }
  getLocation(){
    this.DisplayMap();
  }

  get() {
    var successHandler = (position) => {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
    };
    var errorHandler = function (errorObj) {
      alert(errorObj.code + ": " + errorObj.message);
    };
    navigator.geolocation.getCurrentPosition(
      successHandler, errorHandler,
      { enableHighAccuracy: true, maximumAge: 10000 });
    let coordinate = {
      latitude: this.latitude,
      langitude: this.longitude
    }
    this.coorinates.push(this.coorinates)

    this.nativeStorage.setItem('coordinates', this.coorinates)
      .then((data) =>
        console.log(data),
        error =>
          console.error('Error storing item', error)
      );
  }

  DisplayMap() {

    const location = new google.maps.LatLng(this.latitude,
      this.longitude);

    const options = {
      center: location,
      zoom: 16,
      streetViewControl: false,
      mapTypeId: 'satellite',

    };

    var map = new google.maps.Map(this.mapRef.nativeElement, options);

    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: location,
      radius: 200
    });
    this.addMarker(location, map);
  }


  addMarker(position, map) {
    return new google.maps.Marker({
      position,
      map
    });
  }
}
