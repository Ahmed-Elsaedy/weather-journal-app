// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
app.listen(port, serverCallback);

function serverCallback() {
  console.log("Server running...");
  console.log(`Running on localhost: http://localhost:${port}/`);
}

// GET route
app.get("/api/weather", sendData);

function sendData(request, response) {
  response.send(projectData);
}

// POST route
app.post("/api/weather", addWeather);

function addWeather(request, response) {
  projectData = request.body;
  response.send("POST received");
}
