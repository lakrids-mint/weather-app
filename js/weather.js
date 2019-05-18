class Forecast {
  constructor() {
    this.key = "35b77d5a256d7b65351dd1b6e06c2367";
    this.URI = "https://api.openweathermap.org/data/2.5/weather";
  }
  async getCity(city) {
    const query = `?q=${city}&APPID=${this.key}`;
    const response = await fetch(this.URI + query);
    const data = await response.json();
    return data;
  }
  async getWeather(id) {
    const query = `?id=${id}&units=metric&APPID=${this.key}`;
    const response = await fetch(this.URI + query);
    const data = await response.json();
    return data;
  }
  async updateCity(city) {
    const cityInfo = await this.getCity(city);
    const weather = await this.getWeather(cityInfo.id);

    //Using object shorthand notation because name and value are the same
    return {
      cityInfo,
      weather
    };
  }
}
