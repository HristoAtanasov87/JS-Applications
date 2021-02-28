function attachEvents() {
    document.getElementById('submit').addEventListener('click', () => getLocations());
}
attachEvents();

async function getLocations() {
    const input = document.getElementById('location').value;
    const divForecast = document.getElementById('forecast');

    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    divForecast.innerHTML = '';

    let divCurrent = e('div', undefined, 'id', 'current');
    let divInsideCurrent = e('div', 'Current conditions', 'class', 'label');
    divCurrent.appendChild(divInsideCurrent);

    let divUpcoming = e('div', undefined, 'id', 'upcoming');
    let divInsideUpcoming = e('div', 'Three-day forecast', 'class', 'label');
    divUpcoming.appendChild(divInsideUpcoming);

    divForecast.appendChild(divCurrent);
    divForecast.appendChild(divUpcoming);

    try {
        const response = await fetch(url);
        const dataLocations = await response.json();
        const code = dataLocations.find(el => el.name === input).code;
        divForecast.style.display = 'block';
        getCurrent(code);
        getThreeDays(code);
    } catch (error) {
        divForecast.style.display = 'block';
        divForecast.textContent = 'Error'
    }

}

async function getCurrent(code) {
    let pics = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    }
    const divCurrent = document.getElementById('current');
    const currentConditionsUrl = `http://localhost:3030/jsonstore/forecaster/today/${code}`;

    const response = await fetch(currentConditionsUrl);
    const currentData = await response.json();

    let el = Object.values(currentData)
    const [forecast, name] = el;

    let divToAdd = e('div', undefined, 'class', 'forecasts');
    let spanOne = e('span', undefined, 'class', 'condition symbol');
    spanOne.innerHTML = pics[forecast.condition];
    let spanTwo = e('span', undefined, 'class', 'condition');
    divToAdd.appendChild(spanOne);

    let spanInsideOne = e('span', name, 'class', 'forecast-data');
    let spanInsideTwo = e('span', undefined, 'class', 'forecast-data');
    spanInsideTwo.innerHTML = `${forecast.low}${pics.Degrees}/${forecast.high}${pics.Degrees}`;
    let spanInsideThree = e('span', forecast.condition, 'class', 'forecast-data');
    spanTwo.appendChild(spanInsideOne);
    spanTwo.appendChild(spanInsideTwo);
    spanTwo.appendChild(spanInsideThree);

    divToAdd.appendChild(spanTwo);
    divCurrent.appendChild(divToAdd);

}

async function getThreeDays(code) {
    let pics = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    }
    const divUpcoming = document.getElementById('upcoming');
    const threeDayConditionsUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

    const response = await fetch(threeDayConditionsUrl);
    const threeDaysData = await response.json();
    console.log(threeDaysData);

    let divElement = e('div', undefined, 'class', 'forecast-info');

    let el = Object.values(threeDaysData)
    const [forecast, name] = el;
    forecast.forEach(day => {
        let spanOutside = e('span', undefined, 'class', 'upcoming');
        let spanOne = e('span', undefined, 'class', 'symbol');
        spanOne.innerHTML = pics[day.condition];
        let spanTwo = e('span', undefined, 'class', 'forecast-data');
        spanTwo.innerHTML = `${day.low}${pics.Degrees}/${day.high}${pics.Degrees}`;
        let spanThree = e('span', day.condition, 'class', 'forecast-data');
        spanOutside.appendChild(spanOne)
        spanOutside.appendChild(spanTwo)
        spanOutside.appendChild(spanThree);

        divElement.appendChild(spanOutside);
    })
    divUpcoming.appendChild(divElement);


}

function e(tag, text, attribute, attributeValue) {
    const el = document.createElement(tag);

    if (attribute !== undefined && attributeValue !== undefined) {
        el.setAttribute(attribute, attributeValue);
    }

    if (text !== undefined) {
        el.textContent = text;
    }

    return el
}
