const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');


app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html")
  //res.send("<h1> You're welcome in the industry<h1>")
})
app.post("/", function(req,res){
  const query = req.body.cityName
  const apiKey = "0f78536c9484005cba644105bc4a3e39"

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey

  https.get(url, function(response){
        console.log(response.statusCode)
         response.on("data", function(data){
         const weatherData = JSON.parse(data)
         const tempe = weatherData.main.temp
         const desc = weatherData.weather[0].description
         const icon = weatherData.weather[0].icon
         const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
         console.log(desc);
         console.log(tempe);

         res.write("<p>Weather description:<p> "+ desc)
         res.write("<h1>Temperature in " + query + " is "+ tempe + " Farenhites<h1>")
         res.write("<img src=" + imgURL + ">");
         res.send();
    })
  })

})


app.listen(3000, function(){
  console.log("Server is Started")
})
