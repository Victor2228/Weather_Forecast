const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use('*/css',express.static('public/css'));
app.use('*/images',express.static('public/images'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res)
{
    res.sendFile(__dirname + "/index.html");
});

app.post("/result.html", function(req, res)
{
    var query = req.body.cityName;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=568b1d2d85f1da7b4bcac1cece0b7829&units=metric";
    https.get(url, function(response)
    {
        response.on("data", function(data)
        {
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const w = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imgurl = " https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1 >The temperature of " + query + " is " + temp + " degrees</h1>");
            res.write("<p>The weather is " + w + "</p>");
            res.write("<img src = " + imgurl + " >");
            res.send();
        })
    })

});
app.listen(3000, function()
{
    console.log("Server is running...");
});