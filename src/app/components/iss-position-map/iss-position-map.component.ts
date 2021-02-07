import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-iss-position-map',
  templateUrl: './iss-position-map.component.html',
  styleUrls: ['./iss-position-map.component.scss']
})
export class IssPositionMapComponent implements OnInit, AfterViewInit {

  // Set a custom Icon
  issIcon = L.icon({
    iconUrl: './assets/img/International_Space_Station.svg.png', // Local address - ../../../assets [...]
    iconSize:     [50, 32], // size of the icon
    shadowSize:   [25, 16], // size of the shadow
    iconAnchor:   [25, 16], // point of the icon which will correspond to marker's location
  });


  // Set parameters for the Map (Tile).
  tileURL: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  attribution: string = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  maxZoom: number = 19;
  tiles = L.tileLayer(this.tileURL, { maxZoom: this.maxZoom, attribution: this.attribution});

  api_url: string = 'https://api.wheretheiss.at/v1/satellites/25544';
  longitude: number = 0;
  latitude: number = 0;

  constructor() { }

  // Init the map
  private initMap(): void {
    this.getIss().then(() => {
      const map = L.map('map', {
        center: [ this.latitude, this.longitude ],
        zoom: 4
      });
      this.tiles.addTo(map);
      L.marker([ this.latitude, this.longitude ], {icon: this.issIcon}).addTo(map);
    })
  }

  // Get the info from the WTIA REST API source URL: https://api.wheretheiss.at/v1/satellites/25544
  async getIss() {
    const response = await fetch(this.api_url);
    const data = await response.json();
    const {latitude, longitude} = data;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  ngOnInit(): void {
    L.Icon.Default.imagePath = "../../../assets/img/";
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
