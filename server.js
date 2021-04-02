// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Middleware*/
// const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8080;

const server = app.listen(port, listening);

function listening() {
  console.log("Server Running");
  console.log(`Running on localhost:  ${port}`);
}

//GET Route
app.get("/getWeather", getForecast);
function getForecast(req, res) {
  let projectData = data;
  console.log(projectData);
  res.send(projectData);
}

// POST Route
const data = [];
app.post("/getWeather", getWeatherInfo);
function getWeatherInfo(req, res) {
  const newEntries = {
    date: req.body.date,
    location: req.body.location,
    temp: req.body.temp,
    feelings: req.body.feelings,
    content: req.body.content,
  };
  data.push(newEntries);
  let projectData = data;

  console.log(projectData);
  res.send(projectData);
}
