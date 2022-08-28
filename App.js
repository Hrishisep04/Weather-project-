const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { link } = require("fs");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+ "/index.html");
});

app.post("/",function(req, res)
{
    const query = req.body.cityname;
    const apiKey = "2a307df3af9d850625bcfe9e3ae4a7c4";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=2a307df3af9d850625bcfe9e3ae4a7c4&units=metrics";
    
    https.get(url,function(response){
       console.log(response.statusCode);
        
       response.on("data",function(data){
             const wd = JSON.parse(data);
             const temp = wd.main.temp;
             const weatherDescription = wd.weather[0].description;
             const icon = wd.weather[0].icon;
             const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
             res.write("<p>The weather is currently "+ weatherDescription +"<p>");
             res.write("<h1>The temperature in " + query + " is " + temp + " celcius</h1>");
             res.write("<img src=" + imageURL +">");
            res.send();

         })

     }) 
})
app.listen(3002,function()
{
    console.log("server is on port 3002");
})