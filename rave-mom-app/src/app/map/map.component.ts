import { Component, OnInit, Input } from '@angular/core';
// import { GeoJSONSourceComponent } from 'ngx-mapbox-gl/app/lib/source/geojson/geojson-source.component';
// import { GeoJSONSourceComponent } from '../../../node_modules/ngx-mapbox-gl/app/lib/source/geojson/geojson-source.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
//   template: 
//   `
//   <mgl-map
//     [style]="'mapbox://styles/mapbox/dark-v9'"
//     [zoom]="[16]"
//     [center]="[-115.010276, 36.272285]"
// >
//           <mgl-geojson-source
//           id="symbols-source"
//           >
//               <mgl-feature
//                 *ngFor="let geometry of geometries"
//                 [geometry]="geometry"
//               >
//               </mgl-feature>
//           </mgl-geojson-source>
//   </mgl-map>
//   `,
//   styles: [`
//     mgl-map {
//       height: 500px;
//       width: 100%;
//     }
//     element {

//       height: 2000px;
  
//   }

//   `]
})
export class MapComponent implements OnInit {

  // @Input() geo: GeoJSONSourceComponent;

  constructor() { 

  //   var map = {
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/dark-v9',
  //     center: [-115.010276, 36.272285],
  //     zoom: 16
  // };

  }

  ngOnInit() {
    
  }
  

}
