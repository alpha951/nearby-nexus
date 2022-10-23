import axios from 'axios';
// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


export const getPlacesData = async (type, sw, ne) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getWeatherData = async (lat, lng) => {
    try {
        const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${apiKey}`
        );
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

// export const getWeatherData = async (lat, lng) => {
//     try {
//         if (lat && lng) {
//             const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
//                 params: { lat, lon: lng },
//                 headers: {
//                     'x-rapidapi-key': process.env.REACT_APP_RAPID_API_WEATHER_API_KEY,
//                     'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
//                 },
//             });

//             return data;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };
