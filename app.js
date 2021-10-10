const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
  
})


app.post("/", function(req, res){

    
 const query = req.body.cityName;   
const apiKey = "81306e039eca2dfdac2fc51f90512a06";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=" +apiKey;
https.get(url, function(response){
    console.log(response.statusCode);

   response.on("data", function(data){
     const weatherData = JSON.parse(data)
     const temp = weatherData.main.temp;
     const weatherDescrption = weatherData.weather[0].description;
     const icon = weatherData.weather[0].icon;
     const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

     res.write("<p>The Weatger is currenty" + weatherDescrption + "</p>");
     res.write("<h1>The tempreture in "+ query + " is" + temp +"</h1>");
     res.write("<img src="+imgURL+">");
     res.send();
   })

})



})







app.listen(3000, function(req, res){
    console.log("Server start at port 3000");
})