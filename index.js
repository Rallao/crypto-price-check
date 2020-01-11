
const express = require("express");
const bodyParser = require ("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    console.log(amount);

    var baseURL = "https://apiv2.bitcoinaverage.com/convert/global";

    var options = {
        url: baseURL,
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount,
        }

    }

    request(options, function(error, response, body){
        var data = JSON.parse(body);
        var price = data.price;

        console.log(price);

        res.write("<p> The current price of " + amount + " " + crypto + " is " +  price + " " + fiat + "</p>");

        res.send();
    });
});

app.listen(3000, function(){
    console.log("We are rocking in the 3000's");
});