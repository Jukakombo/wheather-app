const express = require("express");
const app = express();
const bodyparser=require("body-parser");
 app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res) {

  res.sendFile(__dirname +"/index.html");

});

app.post("/" , function(req, res){


const https = require("https");
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + " &appid=" + appiKeey + " &units=" + units + " "
const query = req.body.cityInput;
const appiKey = "209c613a680ff1578c91bb28353940bc";
const units = "metric";


https.get(url, function(response) {
  console.log(response.statusCode);
  response.on("data", function(data) {
    const wheatherData = JSON.parse(data);
    console.log(wheatherData);
    const temp = wheatherData.main.temp;
    console.log(temp);
    const icon = wheatherData.weather[0].icon
    const imageUrl = "https://openweathermap.org/img/wn/" + icon + " @2x.png"
    const description = wheatherData.weather[0].description;
    res.write("<h1>The temperature in "+query+" is " + temp + "degres celcius </h1>");
    res.write("<p>The weather description is " + description+ "<p>");
    res.write("<image src=" + imageUrl + ">");
    res.send();
  });
});
});


app.listen(3000, function() {
  console.log("your server is running at the port 3000");
});
