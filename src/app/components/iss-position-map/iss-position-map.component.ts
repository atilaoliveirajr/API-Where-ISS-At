import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-iss-position-map',
  templateUrl: './iss-position-map.component.html',
  styleUrls: ['./iss-position-map.component.scss']
})
export class IssPositionMapComponent implements OnInit, AfterViewInit {
  private map: any;

  tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  api_url: string = 'https://api.wheretheiss.at/v1/satellites/25544';
  longitude: string = '';
  latitude: string = '';

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
  }

  constructor() { }
  
  async getIss() {
    const response = await fetch(this.api_url);
    const data = await response.json();
    const {latitude, longitude} = data;
    this.latitude = latitude;
    this.longitude = longitude;
    console.log(latitude, longitude)
  }

  ngOnInit(): void {
    this.getIss()
  }

  ngAfterViewInit(): void {
    
    this.initMap();
    this.tiles.addTo(this.map);
  }

}
