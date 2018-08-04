import { Component ,ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare  var google:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  latitude:number;
  longitude:number;
 
  @ViewChild('map') mapRef:ElementRef;
  constructor(public navCtrl: NavController,
     public geolocation: Geolocation,
   ) {
   
    }
    
    ngOnInit() {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude
        this.longitude = resp.coords.longitude
        this.DisplayMap();
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }

    DisplayMap() {

      const location = new google.maps.LatLng(this.latitude,
        this.longitude);

      const options = {
        center:location,
        zoom:10,
        streetViewControl:false,
        mapTypeId:'satellite',
      };

      const map = new google.maps.Map(this.mapRef.nativeElement,options);

      this.addMarker(location,map);
    }

    addMarker(position,map) {
      return new google.maps.Marker({
        position,
        map
      });
    }
}
