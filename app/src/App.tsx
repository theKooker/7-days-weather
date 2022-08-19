import { useState } from "react";
import "./App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup';
import "bootstrap/dist/css/bootstrap.min.css";
import Weather, { API_KEY } from "./weather/weather";

const CITY_SEARCH_URL = "https://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=4&appid=" + API_KEY;

function App() {
  const [searchText, setSearchText] = useState("Munich");
  const [cityName, setCityName] = useState("Munich");
  const [cities, setCities] = useState();
  let defaultCity = "Munich";

  async function searchForCities(search: string) {
    if (!(searchText === "" || search === defaultCity)) {
      fetch(CITY_SEARCH_URL.replace("{city name}", searchText))
        .then((res) => res.json())
        .then((result) => {
          const list = result.map((item: any) => (
            <ListGroup.Item action onClick={() => getCityWeatherFromList(item.name)}>{item.name} {item.country}</ListGroup.Item>
          ));
          setCities(list);
        })

    } else {
      setCities(undefined);
    }

  }
  const handleChange = (event: any) => {
    setSearchText(event.target.value);
    searchForCities(event.target.value);
  };
  function getCityWeather() {
    setCityName(searchText);
  }
  function getCityWeatherFromList(value: string) {
    defaultCity = value;
    setSearchText(value);
    setCityName(value);
    searchForCities(value);
  }
  return (
    <div className="App bg-gradient">
      <div className="d-flex justify-content-center ">
        <div>
          <Form.Control
            onKeyDown={handleChange}
            onChange={handleChange}
            value={searchText}
            className="border border-secondary shadow w-100 mt-4 mr-4 mb-4"
            placeholder="Enter City name..."
          />
          <ListGroup className="position-absolute fly overflow-auto list-group">
              {cities}
            </ListGroup>
        </div>

        <Button
          variant="info"
          className="border border-secondary shadow mt-4 mb-4 m-2"
          onClick={getCityWeather}
        >
          Search
        </Button>
      </div>
      <div>
        <Weather city={cityName} />
      </div>
    </div>
  );
}

export default App;
