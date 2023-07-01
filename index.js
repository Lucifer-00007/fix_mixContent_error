"use strict";
const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
var cors = require("cors");
const port = process.env.PORT || 3012;
const app = express();

app.use(cors());

var requestOptions = {
    method: "GET",
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Upgrade-Insecure-Requests": "1"
    },
    mode: "cors"
};

app.get("/", (req, res) => {
    res.status(401).json({'status': false, 'msg': 'city name missing in url!'})
})

app.get("/:place", async(req, res) => {
    try {
        const urls = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${req.params.place}&units=${process.env.units}&appid=${process.env.appid}`,
            requestOptions
        );
        const urls_json = await urls.json();

        if (urls_json) {
            res.status(200).json(urls_json);
        }
    } catch (e) {
        console.log('err', e);
        res.status(400).json({'status': false, 'msg': e.message});
    }
});


app.listen(port, () => {
    console.log(`weather api listening on port ${port}!`);
});









