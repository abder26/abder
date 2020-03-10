import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../shared/service/weather.service';
import { Forecast } from '../shared/models/forecast.model';
import { SelectCityComponent } from '../select-city/select-city.component';


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  private meteoForecast: Forecast[] = [];


  constructor(
    private selectCityComponent: SelectCityComponent,
    private weatherService: WeatherService,
  ) {
    // this.displayForecast();
  }

  ngOnInit() { }


  // public displayForecast(cityName) {
  //   this.weatherService
  //     .getForecast(cityName)
  //     .then((dataForecast: Forecast[]) => {
  //       this.weatherService.hydrateForecast(dataForecast)
  //         .then((dataForecast: Forecast[]) => {
  //           this.meteoForecast = dataForecast;
  //         })
  //     })
  // }

}
