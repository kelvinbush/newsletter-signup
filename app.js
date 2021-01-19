const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();
app.use('*/css', express.static('public/css'));
app.use('*/images', express.static('public/images'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    console.log(req.body.firstname + " " + req.body.lastName + " " + req.body.email);
})

app.listen(3000, () => {
    console.log("server started on port 3000");
})