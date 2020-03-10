import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Weather } from '../shared/models/weather.model';
import { WeatherService } from '../shared/service/weather.service';
import { HttpClient } from '@angular/common/http';
import { ForecastComponent } from '../forecast/forecast.component';
import { Forecast } from '../shared/models/forecast.model';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss'],
})
export class SelectCityComponent implements OnInit {
  private cityForm: FormGroup;
  private meteo: Weather[] = [];
  private forecastComponent: ForecastComponent;
  private meteoForecast: Forecast[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    private http: HttpClient,
  ) {
    this.cityForm = this.formBuilder.group({
      city: [''],
    });
  }

  ngOnInit() { }

  public displayMeteo(cityName) {
    this.weatherService
      .getMeteo(cityName)
      .then((data: Weather[]) => {
        this.weatherService.hydrateModel(data)
          .then((data: Weather[]) => {
            this.meteo = data;
          })
        this.weatherService
          .getForecast(cityName)
          .then((dataForecast: Forecast[]) => {
            this.weatherService.hydrateForecast(dataForecast)
            // .then(() => {})
              .then((dataForecast: Forecast[]) => {
                this.meteoForecast = dataForecast;
              })
          })
      })
  }




  // submit() {
  //   const value = this.cityForm.get(this.meteo['city']).value;
  // }
}
