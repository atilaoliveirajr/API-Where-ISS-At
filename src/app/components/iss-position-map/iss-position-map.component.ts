import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-iss-position-map',
  templateUrl: './iss-position-map.component.html',
  styleUrls: ['./iss-position-map.component.scss']
})
export class IssPositionMapComponent implements OnInit, AfterViewInit {

  map: any;
  marker: any;
  isMap_NOT_Initialized: boolean = true;

  // Set a custom Icon to represent the ISS.
  issIcon = L.icon({
    /* iconUrl: './assets/img/International_Space_Station.svg.png', */  // Server address
    iconUrl: '../../../assets/img/International_Space_Station.svg.png', // Localhost address
    iconSize:     [50, 32], // size of the icon
    iconAnchor:   [25, 16], // point of the icon which will correspond to marker's location
  });


  // Set parameters for the Map (Tile).
  tileURL: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  attribution: string = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  maxZoom: number = 19;
  tiles = L.tileLayer(this.tileURL, { maxZoom: this.maxZoom, attribution: this.attribution});

  // Variables that will store the json data + API URL
  api_url: string = 'https://api.wheretheiss.at/v1/satellites/25544';
  longitude: number = 0;
  latitude: number = 0;
  velocity: number = 0;

  // Get the info from the WTIA REST API source URL: https://api.wheretheiss.at/v1/satellites/25544
  async getISSData() {
    const response = await fetch(this.api_url);
    const data = await response.json();
    const {latitude, longitude, velocity} = data;
    this.latitude = latitude;
    this.longitude = longitude;
    this.velocity = velocity;
  }

  constructor() { }

  // Init the map
  private initMap(): void {
    
    setInterval(() => {
      this.getISSData().then(() => {
      
        // This block creates the map and the marker for the first time.
        if(this.isMap_NOT_Initialized) {
          this.map = L.map('map', {
            center: [ this.latitude, this.longitude ],
            zoom: 4
          });
          this.marker = L.marker([ 0, 0 ], {icon: this.issIcon}).addTo(this.map);
          this.isMap_NOT_Initialized = false;
        }
        
        // This code updates the map and the marker position.
        this.marker.setLatLng([ this.latitude, this.longitude ]);
        this.tiles.addTo(this.map);
        
      })
    }, 1000)
  }

  ngOnInit(): void {
    // Due to a bug in the API x Angular, it is necessary to adjust manually the icon img address.
    L.Icon.Default.imagePath = "../../../assets/img/";
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
  
}
