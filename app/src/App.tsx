import { useState } from "react";
import "./App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./weather/weather";

function App() {
  const [searchText, setSearchText] = useState("Munich");
  const [cityName, setCityName] = useState("Munich");
  const handleChange = (event: any) => {
    setSearchText(event.target.value);
  };
  function getCityWeather() {
    setCityName(searchText);
  }
  return (
    <div className="App bg-gradient">
      <div className="d-flex justify-content-center ">
        <Form.Control
          onChange={handleChange}
          value={searchText}
          className="border border-secondary shadow w-25 mt-4 mr-4 mb-4"
          placeholder="Enter City name..."
        />
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
