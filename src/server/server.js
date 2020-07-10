projData = [];

var path = require('path')
const express = require('express')

const app = express()


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

//GET route to return projectData

app.get('/getData', (request, response) => {
    console.log(projData);
    response.send(projData);
});

//POST route to add to projectData
app.post('/addData', function addData(request, response) {

    let newEntry = {
        city: request.body.city,
        country: request.body.country,
        date: request.body.date,
        daysleft: request.body.daysleft,
        triplength: request.body.triplength,
        temp: request.body.temp,
        weather: request.body.weather,
        img: request.body.img
    }
    console.log('entry recieved server', newEntry);
    projData.push(newEntry);
    console.log('projData', projData);
    response.send("done");
});
