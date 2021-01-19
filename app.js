const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use('*/css', express.static('public/css'));
app.use('*/images', express.static('public/images'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    const fName = req.body.firstname;
    const lName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }
        }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/ists/b08a760e38"
    const options = {
        method: "POST",
        auth: "kelvin:5923a40e22d197bf4d0aa65e0e305560-us7"
    }

    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else res.sendFile(__dirname + "/failure.html");

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure.html", (req, res) => {
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("server started on port 3000");
})


// 5923a40e22d197bf4d0aa65e0e305560-us7
// b08a760e38