import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import { WiDaySunny } from "react-icons/wi";
import "./App.css";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import axios from "axios";
import weatherService from "./services/apı.jsx";
import { WiHumidity } from "react-icons/wi";

import bulutluimages from "./images/bulutlu.svg"; //Bulutlu
import güneşliimages from "./images/güneşli.svg"; //güneşli
import gökgürültülüimages from "./images/gokgürültülü.svg"; //gökgürültülü fırtına
import parcalıbulutimages from "./images/parcalıbulut.svg"; // parcalıbulutlu
import karlıimages from "./images/karlı.svg"; //karlı
import pusluimages from "./images/puslu.svg"; //puslu
import şiddetliyağmurimages from "./images/şiddetliyağmur.svg"; //şiddetliyağmur
import sulukarimages from "./images/sulukar.svg"; //sulukar
import yagmurluimages from "./images/yagmurlu.svg"; //yagmurlu
import ruzgarlıimages from "./images/ruzgar.svg"; //ruzgarlı

function App() {
  //*arama yapınca verileri tutmak için
  const [search, setSearch] = useState("");
  //*Hava durumu verisi için
  const [weatherData, setWeatherData] = useState(null);

  const handleGetWeather = async (city) => {
    // API isteğinizi buradan yapabilirsiniz.
    try {
      if (city) {
        const data = await weatherService.getCity(city);
        const {
          name,
          main: { temp },
          main: { humidity },
          weather,
        } = data;
        const description = weather[0].description;

        setWeatherData({ name, temp, weather, description, humidity });
        // console.log("Hava durumu verisi", { name, temp, description });
        console.log("Hava durumu verisi", data);
      } else {
        toast.error("Lütfen bir şehir girin.");
      }
    } catch (error) {
      toast.error("İstekte bir hata oluştu ", +error);
      setSearch("");
    }
  };
  const handleSubmit = () => {
    if (search) {
      handleGetWeather(search); // Kullanıcının girdiği şehir adı ile veri al
    } else {
      toast.error("Lütfen aramak için bir şehir girin.");
    }
  };

  const getWeatherImage = (description) => {
    if (description.includes("güneş")) {
      return güneşliimages;
    } else if (description.includes("bulut")) {
      return bulutluimages;
    } else if (description.includes("gokgür")) {
      return gökgürültülüimages;
    } else if (description.includes("parcalı")) {
      return parcalıbulutimages;
    } else if (description.includes("karlı")) {
      return karlıimages;
    } else if (description.includes("puslu")) {
      return pusluimages;
    } else if (description.includes("şiddetli")) {
      return şiddetliyağmurimages;
    } else if (description.includes("yagmurlu")) {
      return yagmurluimages;
    } else if (description.includes("ruzgar")) {
      return ruzgarlıimages;
    } else if (description.includes("sulukar")) {
      return sulukarimages;
    } else if (description.includes("açık")) {
      return güneşliimages;
    } else if (description.includes("kapalı")) {
      return bulutluimages;
    } else {
      return null;
    }
  };

  return (
    <div className="allPage">
      <div className="title-searh">
        <div className="title">
          <h1> Günlük Hava Durumu </h1>
        </div>

        <div className="input-search">
          <input
            style={{
              marginRight: "5px",
              height: "29px",
              borderRadius: "5px",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder=" Şehir ara..."
          />
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Ara
          </Button>
        </div>
      </div>

      <Container
        maxWidth="xl"
        className="container"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {weatherData && (
          <Card className="card" sx={{ marginTop: "30px", width: "300px" }}>
            <h6
              style={{
                marginTop: "30px",
                fontSize: "18px",
                fontFamily: "Arial",
              }}
            >
              <h2>{weatherData.name}</h2>
            </h6>

            <img
              src={getWeatherImage(weatherData.description)}
              alt={weatherData.description}
              style={{ width: "100px", height: "100px", marginTop: "20px" }}
            />

            <CardContent className="content">
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "18px",
                  fontFamily: "Arial",
                }}
              >
                {Math.round(weatherData.temp)}°C
              </p>
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "18px",
                  fontFamily: "Arial",
                  textTransform: "capitalize",
                }}
              >
                {weatherData.description}
              </p>
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "20px",
                }}
              >
                Nem:{weatherData.humidity}%
              </p>
            </CardContent>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default App;
