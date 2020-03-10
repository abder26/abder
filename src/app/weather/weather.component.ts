import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/service/weather.service';
import { Weather } from '../shared/models/weather.model';



@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  private meteo: Weather[] = [];

  constructor(
    private weatherService: WeatherService
  ) { 
    this.weatherService.getGoodMeteo()
    .then((weather: Weather[]) => {
      this.meteo = weather
    })
    this.weatherService.getGeoLoc()
    .then((dataGeoLoc) => {
      // console.log(dataGeoLoc);
  
      this.weatherService.getMeteoByPosition(dataGeoLoc)
      .then((meteoGeoLoc) => {
        this.weatherService.hydrateModel(meteoGeoLoc)
        .then((weatherGeoLoc: Weather[]) => {
          this.meteo = weatherGeoLoc
        })
      })
    })
  }


ngOnInit() { }

}
