/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = "dd846810f29d59c0e43904c86cc73aae";

// Event listener to add function to existing HTML DOM element
const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", handleGenerate);

/* Function called by event listener */
async function handleGenerate(e) {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  if (!zip || !feelings) {
    alert("Please make sure to insert zip code and feelings first.");
    return;
  }

  // Get data from weather api
  const data = await getWeatherAPIData(zip, apiKey);
  if (data.cod === "404") {
    alert("City not found");
    return;
  }

  // Create a new date instance dynamically with JS
  let d = new Date();
  let date = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

  // Create new data to be send to the server
  const newData = {
    temp: data.main.temp,
    date,
    feelings,
  };

  // Post data to the server
  await postWeatherData("/api/weather", newData);

  // Get data from the server
  const serverData = await getWeatherServerData("/api/weather");
  updateUI(serverData);
}

/* Function to GET Web API Data*/
const getWeatherAPIData = async (zip, key) => {
  var url = `http://api.openweathermap.org/data/2.5/weather?units=metric&zip=${zip}&appid=${key}`;
  const res = await fetch(url);
  try {
    return await res.json();
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postWeatherData = async (url, data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const getWeatherServerData = async (url) => {
  const res = await fetch(url);
  try {
    return await res.json();
  } catch (error) {
    console.log("error", error);
  }
};

// Function to Update UI
function updateUI(serverData) {
  // Update the UI
  const dateElement = document.getElementById("date");
  const tempElement = document.getElementById("temp");
  const contentElement = document.getElementById("content");

  dateElement.innerHTML = `Date: ${serverData.date}`;
  tempElement.innerHTML = `Tempreture: ${serverData.temp} °C`;
  contentElement.innerHTML = `Your Feelings: ${serverData.feelings}`;

  // Reset inputs
  document.getElementById("zip").value = "";
  document.getElementById("feelings").value = "";
}
