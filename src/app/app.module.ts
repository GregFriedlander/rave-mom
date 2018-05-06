import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SosComponent } from './sos/sos.component';
import { MapComponent } from './map/map.component';
import { PlurtifyComponent } from './plurtify/plurtify.component';
import { GeoJSONSourceComponent } from '../../node_modules/ngx-mapbox-gl/app/lib/source/geojson/geojson-source.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SosComponent,
    MapComponent,
    PlurtifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMapboxGLModule.forRoot({
      accessToken: 'pk.eyJ1IjoiZ3JlZ2ZyaWVkbGFuZGVyIiwiYSI6ImNqZ3U2NmJiZjEzeTEyenJ0cDgwcjlnMGIifQ.65pjTUbhHUNGH4jG_Vshbg', // Can also be set per map (accessToken input of mgl-map)
      // geocoderAccessToken: 'TOKEN' // Optionnal, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
