import axios from "axios";

class WeatherService {
  API = {
    URL: "https://api.openweathermap.org/data/2.5/",
    KEY: "4e50f853955b74bed05de91e60427bfd",
  };

  getCity(city) {
    return axios
      .get(
        `${this.API.URL}weather?q=${city}&appid=${this.API.KEY}&units=metric&lang=tr`
      )
      .then((response) => response.data)
      .catch((error) => {
        error;
      });
  }
}

export default new WeatherService();

// https://api.openweathermap.org/data/2.5/weather?q=ankara&appid=4e50f853955b74bed05de91e60427bfd&units=metric&lang=tr

// KEY: "4e50f853955b74bed05de91e60427bfd",
