var express = require('express');
var app = express();

const axios = require('axios');
const {response} = require("express");
const e = require("express");

const port = 8080;
const baseURL = "https://api.livecoinwatch.com";

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/coin', function(req, res) {
    let parameters = req.query;
    let endPoint = "/coins/single";
    let fullUrl = baseURL + endPoint;

    let body = {
        currency : parameters.currency,
        code: parameters.code,
        meta: parameters.meta
    }

    let  _headers = {'x-api-key': parameters.key}

    axios.post(fullUrl,body,{headers:_headers}).then((response) => {
        if(response.status == 200){
            let data = response.data;
            let info;
            if(parameters.fullData == "true"){
                res.type("text");
                info = JSON.stringify(data);
            }else{
                res.type("text");
                info = data.rate.toString();
            }

            res.writeHead(200);
            res.end(info);
        }
    })
    .catch((error) => {
        console.log(error);
        res.type("text");
        res.writeHead(200);
        res.end("0.0");
    })
});