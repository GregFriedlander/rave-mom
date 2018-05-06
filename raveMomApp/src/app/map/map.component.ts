import { Component, OnInit, Input } from '@angular/core';
import { ApiHttpService } from '../api-http.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  constructor(public service: ApiHttpService) { }

  firstHTML;
  secondHTML;
  time;

  ngOnInit() {
    this.getUserData();
  }

  getUserData(){
    let observable = this.service.getInfo();
    observable.subscribe((data:any)=>{
      console.log(data);
    })
  }

  showKey(){
    console.log('Showing the Key');
    let key = document.getElementById('map-key');
    if(key.style.display == 'none'){
      key.style.display = 'block';
    }else{
      key.style.display = "none";
    }
  }
  
  showTime() {
    console.log('clicked');
    this.time = "12 minutes away"
  }

}
