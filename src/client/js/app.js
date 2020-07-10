const cityField = document.getElementById('location');
const date1Field = document.getElementById('date1');
const date2Field = document.getElementById('date2');

var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

//API Urls
const url = 'http://api.geonames.org/searchJSON?q=';
const weatherbitUrl = 'https://api.weatherbit.io/v2.0/';
const pixabayUrl = 'https://pixabay.com/api/?q=';

//Api Keyss
const apiKey = '&username=argunmurad';
const weatherbitKey = '&key=80debe3970634516adaed1ce756a2cfe';
const pixabayKey = '&key=17387169-15dbbc04e0385de0fbc2edbf7';

require("regenerator-runtime/runtime");

//primary Object
const obj = {city: "Baku", 
    country: "Azerbaijan", 
    date: "11/11/2011", 
    daysleft: "55", 
    triplength: "10", 
    temp: "23", 
    weather: "Sunny", 
    img: "https://pixabay.com/get/57e8d0404256a814f1dc84609629307d1d38dfe35a4c704c7c2b78d59048c158_640.jpg" }

async function mainFunction() {
    const cityFieldValue = cityField.value;
    const date1FieldValue = date1Field.value;
    const date2FieldValue = date2Field.value;

    cityField.value = ''
    date1Field.value = ''
    date2Field.value = ''
    //Arrival Date converting
    var arrayDate = date1FieldValue.match(pattern);
    var dt = new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1]);

    //Departure date converting
    var arrayDate2 = date2FieldValue.match(pattern);
    var dt2 = new Date(arrayDate2[3], arrayDate2[2] - 1, arrayDate2[1]);

    //Current Date
    var currDate = new Date()

    //Calculating days left  to Arrival 
    var daysLeft = parseInt(((dt.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24)), 10);

    //Calculating length of trip
    var tripLength = parseInt(((dt2.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24)), 10);

    console.log(daysLeft, 'days left to the trip');
    console.log('trip length', tripLength);
    var cityData = await getData(url + cityFieldValue + apiKey);
    console.log('city', cityData);
    var lng = cityData.geonames[0].lng;
    var lat = cityData.geonames[0].lat;
    var countryName = cityData.geonames[0].countryName;

    console.log(lng, lat, countryName)

    //ToDo:  Set up this variable so that it changes depending on when the trip is
    if (daysLeft <= 7) {
        var weatherRequest = 'current?' + 'lat=' + lat + '&lon=' + lng + '&units=M';
        var weatherInfo = await getData(weatherbitUrl + weatherRequest + weatherbitKey);
        var temperature = weatherInfo.data[0].app_temp;
        var weatherDescription = weatherInfo.data[0].weather.description;
        console.log('Current weather: ', temperature, weatherDescription)
    }
    else {
        var weatherRequest = 'forecast/daily?' + 'lat=' + lat + '&lon=' + lng + '&units=M';
        var weatherInfo = await getData(weatherbitUrl + weatherRequest + weatherbitKey);
        var temperature = weatherInfo.data[0].temp;
        var weatherDescription = weatherInfo.data[0].weather.description;
        console.log('Forecasted weather: ', temperature, weatherDescription)

    }

    var imgData = await getData(pixabayUrl + cityFieldValue + pixabayKey);
    var imgUrl = imgData.hits[1].webformatURL;
    console.log('img url', imgUrl);

    await postData('/addData', { city: cityFieldValue, country: countryName, date: date1FieldValue, daysleft: daysLeft, triplength: tripLength, temp: temperature, weather: weatherDescription, img: imgUrl })


    updateUI();
}

const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('went wrong');
        console.log('error', error);
    }

}

const getData = async (url) => {

    const res = await fetch(url);
    try {
        const data = await res.json();
        console.log(url)
        console.log('data recieved..');
        console.log(data);
        return data;
    }
    catch (error) {
        console.log("error", error);
    }
}
const updateUI = async () => {
    //recieving project data from the server
    var data = await getData('/getData')
    console.log('ui recieved', data);

    //defining the results element
    const results = document.querySelector('.results');

    //getting the last trip from project data
    var tripInfoCard = data[data.length - 1];

    //defining the new result (trip)
    const newResult = document.createElement('dir');
    newResult.classList.add('result');

    //adding the picture and its properties
    const resultPic = document.createElement('dir');
    resultPic.classList.add('countryPicture');
    resultPic.innerHTML = "<img src=" + tripInfoCard.img + ' width=60% height=60% alt="Germany flag" />'
    newResult.appendChild(resultPic);

    //creating result info
    const resultInfo = document.createElement('dir');
    resultInfo.classList.add('tripInfo');

    //adding different text infos into the result info
    const textInfo1 = document.createElement('dir');
    textInfo1.classList.add('textInfo');
    textInfo1.innerText = tripInfoCard.city + ', ' + tripInfoCard.country;
    resultInfo.appendChild(textInfo1);

    const textInfo2 = document.createElement('dir');
    textInfo2.classList.add('textInfo');
    textInfo2.innerText = 'Departing: ' + tripInfoCard.date + ', ' + tripInfoCard.daysleft + ' days left.';
    resultInfo.appendChild(textInfo2);

    const textInfo3 = document.createElement('dir');
    textInfo3.classList.add('textInfo');
    textInfo3.innerText = 'Trip Length: ' + tripInfoCard.triplength + " days";
    resultInfo.appendChild(textInfo3);

    const textInfo4 = document.createElement('dir');
    textInfo4.classList.add('textInfo');
    textInfo4.innerText = tripInfoCard.temp + " celcius, " + tripInfoCard.weather;
    resultInfo.appendChild(textInfo4);

    //
    newResult.appendChild(resultInfo);
    results.appendChild(newResult);


}

const checkForUrl = (string) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(string);
} 

const urlEncode = (string) => {
    return encodeURIComponent(string);
}

export {mainFunction, checkForUrl, urlEncode}