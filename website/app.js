/* Global Variables */
let temperature = document.querySelector("#temp");
let weatherDate = document.querySelector("#date");
let content = document.querySelector("#content");

// const { response } = require("express");

// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = "869ee5bbe03c7234b3c050fb595183db";

let zipCode;

const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";

const getWeatherInfo = async (zipCode) => {
  const weatherResponse = await fetch(
    baseUrl + zipCode + ",IN" + "&appid=" + apiKey
  );
  console.log(weatherResponse);

  try {
    const weatherCapture = await weatherResponse.json();
    console.log(weatherCapture);
    return weatherCapture;
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("generate").addEventListener("click", getWeatherData);

async function getWeatherData(params) {
  if (document.getElementById("zip").value !== "") {
    zipCode = document.getElementById("zip").value;
    let jsonObj = await getWeatherInfo(zipCode);
    let dateCurrent = new Date().toDateString();
    let country = jsonObj.sys.country;
    let tempCurrent = jsonObj.main.temp;
    let feelingLike = jsonObj.main.feels_like;
    let feelingTextArea = document.getElementById("feelings").value;
    postData("/getWeather", {
      date: dateCurrent,
      location: country,
      temp: tempCurrent,
      feelings: feelingLike,
      content: feelingTextArea,
    }).then(updateUI());

    console.log("feeling like:", feelingLike);
  } else {
    console.error("the error");
  }
}

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    weatherDate.innerHTML = allData[allData.length - 1].date;
    temperature.innerHTML = allData[allData.length - 1].temp;
    content.innerHTML = allData[allData.length - 1].content;
  } catch (error) {
    console.log("Error:", error);
  }
};
