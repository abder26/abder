import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../models/weather.model';
import { Forecast } from '../models/forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private meteo: Weather[] = [];
  private meteoForecast: Forecast[] = [];


  constructor(
    private http: HttpClient,
  ) { }

  public getMeteo(cityName) {

    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=` + cityName + `&lang=fr&units=metric&appid=0bc06b6deadef3ef831731f799743517`)
      .toPromise()
  }

  public hydrateModel(data) {
    return new Promise((resolve, reject) => {
      // console.log(data);

      this.meteo['city'] = data['name'];
      console.log(this.meteo['city']);
      this.meteo['actual'] = data['main']['temp'];
      console.log(this.meteo['actual']);
      this.meteo['max'] = data['main']['temp_max'];
      console.log(this.meteo['max']);
      this.meteo['min'] = data['main']['temp_min'];
      console.log(this.meteo['min']);
      this.meteo['description'] = data['weather'][0]['description'];
      console.log(this.meteo['description']);
    
      resolve(this.meteo)
    })
  }

  public getGoodMeteo() {
    return new Promise((resolve, reject) => {
      resolve(this.meteo)
    })
  }

  public getGeoLoc() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position)
      })
    })
  }

  public getMeteoByPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?&lat=` + lat + `&lon=` + long + `&lang=fr&units=metric&appid=0bc06b6deadef3ef831731f799743517`)
      .toPromise()
  }

  public getForecast(cityName) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=`+ cityName +`&lang=fr&units=metric&appid=0bc06b6deadef3ef831731f799743517`)
      .toPromise()
  }

  public hydrateForecast(dataForecast) {
    return new Promise((resolve, reject) => {

      this.meteoForecast['name'] = dataForecast['city']['name'];
      console.log('ok Abder',this.meteoForecast['name']);
      this.meteoForecast['actual'] = dataForecast['list'][8]['main']['temp'];
      console.log(this.meteoForecast['actual']);
      this.meteoForecast['max'] = dataForecast['list'][8]['main']['temp_max'];
      console.log(this.meteoForecast['max']);
      this.meteoForecast['min'] = dataForecast['list'][8]['main']['temp_min'];
      console.log(this.meteoForecast['min']);
      this.meteoForecast['description'] = dataForecast['list'][8]['weather'][0]['description'];
      console.log(this.meteoForecast['description']);
      this.meteoForecast['date'] = dataForecast['list'][8]['dt_txt'];
      console.log(this.meteoForecast['date']);

      resolve(this.meteoForecast)

    })
  }

}

