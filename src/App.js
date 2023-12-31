import axios from "axios";
import React, { useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7c32e1e52f9a4cb452b0b4914df3a1c4`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      setIsLoading(true);
      axios
        .get(url)
        .then((resp) => {
          setIsLoading(false);
          setData(resp.data);
          console.log(resp.data);
          setError(null);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching Data", error);
          setError("The entered city doesn't exist");
        });
    }
  };

  const rendered = (
    <div className="container">
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()} °F</h1> : null}
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].description}</p> : null}
        </div>
      </div>
      <>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like} °F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed(2)} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </>
    </div>
  );

  const override = {
    display: "block",
    margin: "auto",
    borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="result">
        {isLoading ? (
          <FadeLoader
            color={"#EB5406"}
            loading={isLoading}
            size={100}
            cssOverride={override}
          />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          rendered
        )}
      </div>
    </div>
  );
}

export default App;
