import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iss-position-map',
  templateUrl: './iss-position-map.component.html',
  styleUrls: ['./iss-position-map.component.scss']
})
export class IssPositionMapComponent implements OnInit {

  api_url: string = 'https://api.wheretheiss.at/v1/satellites/25544';
  longitude: string = '';
  latitude: string = '';

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

}
