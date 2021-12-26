import React from 'react';
import moment from 'moment';
import './styles.css';

// let moonmoji = require('moonmoji')();

class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: undefined,
    sunrise: undefined,
    sunset: undefined,
    moonImage: undefined,
  }

  componentDidMount() {
    if (navigator.geolocation) {

      this.getPosition()
      .then((position) => {      
        this.getWeather(position.coords.latitude, position.coords.longitude)
      })
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      });
    }
    else {
      alert("Geolocation not available")
    }   

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );

    // switch(moonmoji.name) {
    //   case("New Moon"):
    //     this.setState({moonImage: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Twemoji_1f311.svg"});
    //     break;
    //   case("Waxing Crescent"):
    //     this.setState({moonImage: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Twemoji_1f312.svg"});
    //     break;
    //   case("First Quarter"):
    //     this.setState({moonImage: "https://upload.wikimedia.org/wikipedia/commons/4/40/Twemoji_1f313.svg"});
    //     break;
    //   case("Waxing Gibbous"):
    //     this.setState({moonImage: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Twemoji_1f314.svg"});
    //     break;
    //   case("Full Moon"):
    //     this.setState({moonImage: "https://upload.wikimedia.org/wikipedia/commons/7/78/Twemoji_1f315.svg"});
    //     break;
    //   case("Waning Gibbous"):
    //     this.setState({moonImage: "https://upload.wikimedia.org/wikipedia/commons/d/de/Twemoji_1f316.svg"});
    //     break;
    //   case("Last Quarter"):
    //     this.setState({moonImage: "https://upload.wikimedia.org/wikipedia/commons/6/67/Twemoji_1f317.svg"});
    //     break;
    //   case("Waning Crescent"):
    //     this.setState({moonImage: "https://upload.wikimedia.org/wikipedia/commons/9/96/Twemoji_1f318.svg"});
    //     break;
    //   default:
    //     this.setState({moonImage: undefined});
    //     break;
    // }
  }   

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // tick = () => {
  //   this.getPosition()
  //   .then((position) => {      
  //     this.getWeather(position.coords.latitude, position.coords.longitude)
  //   })
  //   .catch((err) => {
  //     this.setState({ errorMessage: err.message });
  //   });
  // }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
  
  getWeather = async (lat, lon) => {     
    const api_call = await fetch(`//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=77cf251f6a9c900b837b198d15291c82&units=metric`);
    const data = await api_call.json();
    this.setState({
      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      // sunrise: this.getTimeFromUnixTimeStamp(data.sys.sunrise),
      sunrise: moment.unix(data.sys.sunrise).format("hh:mm a"),
      sunset: moment.unix(data.sys.sunset).format("hh:mm a"),
      // sunset: this.getTimeFromUnixTimeStamp(data.sys.sunset),      
    })
  }

  render() {
    if (this.state.city) {
      return (
        <div className="weather">   
          <div>
            <p className="city">{this.state.city}</p> 
            <p className="temp">
              {this.state.temperatureC} &deg;C 
              <span className="slash"> / </span>
              <span>{this.state.temperatureF} &deg;F</span>
            </p>            
            <p className="humidity">Humidity: {this.state.humidity}%</p>
            <p className="desc">{this.state.description}</p>
          </div>         
          <div>
            <p className="sunrise">Sunrise: {this.state.sunrise}</p>
            <p className="sunset">Sunset: {this.state.sunset}</p>
            
          </div>       
          
        </div>
      )
    }
    else {
      return null;
    }
    
  }
}

export default Weather;