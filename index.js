const express = require("express");

const app = express();

app.get("/", (req, res) => {
  let city = req.query.city;
  const request = require("request");

  request(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe1cfef6e23590f5bc87a36027ade23c`,
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var data = JSON.parse(body);
        const weatherDescription = data.main.temp;

        const rr = Number(weatherDescription - 273.15);
        let number = rr;
        let withoutDecimals = parseFloat(number).toFixed(2);

        res.send(
          `The weather in your city ${city} is in(kelvin) ${weatherDescription} and in(celsius) ${withoutDecimals}.`
        );
      } else {
        res.status(response.statusCode).send("Error fetching weather data.");
      }
    }
  );
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
