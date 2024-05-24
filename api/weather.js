const { default: axios } = require("axios");

const apiKey = '02a832148bfb4f3895081957242405'
const apiURL = params => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.country}&days=${params.day}&aqi=no&alerts=no;`

const apiCall = async (URL) => {
    const options = {
        method: 'GET',
        url: URL
    }
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (err) {
        console.log('error', err);
        return null;
    }
}

export const fetchWeatherForecast = params => {
    return apiCall(apiURL(params));
}