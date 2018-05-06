import { Component, OnInit, Input } from '@angular/core';
import { ApiHttpService } from '../api-http.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  constructor(public service: ApiHttpService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData(){
    let observable = this.service.getInfo();
    observable.subscribe((data:any)=>{
      console.log(data);
    })
  }
  

}
