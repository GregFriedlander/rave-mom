import { Component, OnInit } from '@angular/core';

@Component({
  // selector: 'app-map',
  // templateUrl: './map.component.html',
  // styleUrls: ['./map.component.css']
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v10'"
    [zoom]="[9]"
    [center]="[-115.010276, 36.272285]"
  >
  </mgl-map>
  `,
  styles: [`
    mgl-map {
      height: 500px;
      width: 100%;
    }
    element {

      height: 2000px;
  
  }

  `]
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
