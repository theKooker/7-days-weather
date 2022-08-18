import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { FaTemperatureHigh } from "react-icons/fa";
import { TbTemperatureCelsius } from "react-icons/tb";
import { BsWind, BsEyeFill} from "react-icons/bs";
import { WiHumidity} from "react-icons/wi";


const API_KEY = "969ffdf26fcefccf82fc1d58d51c212a";
const WEATHER_API ="https://api.openweathermap.org/data/2.5/forecast?q={city name}&units=metric&appid=" +API_KEY;
const ICON_URL = "https://openweathermap.org/img/wn/{icon}@4x.png";
const WEEK_DAYS = ["Monday", "Tuesdays", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


function Weather(props: any) {
    
    const [weatherDays, setWeatherDays] = useState();
    async function createCards() 
    {
        fetch(WEATHER_API.replace("{city name}", props.city))
          .then((res) => res.json())
          .then((result) => {
            let distinctDates: any[] = [];
    
            const list = result.list.map((item: any) => {
                const date = new Date(item.dt_txt);
                const dayOfWeek = WEEK_DAYS[date.getDay()];
                const str =  (item.dt_txt as string).substring(0,(item.dt_txt as string).indexOf(" "));
              if (
                distinctDates.indexOf(str) == -1
              ) {
                distinctDates.push(str);
                const iconUrl = ICON_URL.replace("{icon}",item.weather[0].icon.replace("n","d"));
                console.log(iconUrl);
                return (
                  <Card className="m-3 p-4" style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={iconUrl} />
                    <Card.Body>
                      <Card.Title>{str} {dayOfWeek}</Card.Title>
                      <div className="d-flex flex-row">
                            <div className="p-2"><FaTemperatureHigh size={20} /></div>
                            <div className="pl-2 pt-2"><h5>{Math.trunc(item.main.temp)}</h5></div>
                            <div className="pt-2"><TbTemperatureCelsius size={20} /></div>
                    </div>
                    <div className="d-flex flex-row">
                            <div className="p-2"><BsWind size={20} /></div>
                            <div className="pl-2 pt-2"><h5>{item.wind.speed}</h5></div>
                            <div className="pt-2"><h5>m/s</h5></div>
                    </div>
                    <div className="d-flex flex-row">
                            <div className="p-2"><BsEyeFill size={20} /></div>
                            <div className="pl-2 pt-2"><h5>{item.visibility / 1000}</h5></div>
                            <div className="pt-2"><h5>km</h5></div>
                    </div>
                    <div className="d-flex flex-row">
                            <div className="p-2"><WiHumidity size={20} /></div>
                            <div className="pl-2 pt-2"><h5>{item.main.humidity}</h5></div>
                            <div className="pt-2"><h5>%</h5></div>
                    </div>
                    </Card.Body>
                  </Card>
                );
              }
            },
            (error: any) => {
                console.log(error);
            });
            setWeatherDays(list);
          });
      }

  useEffect(() => {createCards()}, [props.city]);
  return <div className="d-flex flex-row">{weatherDays}</div>;
}

export default Weather;
