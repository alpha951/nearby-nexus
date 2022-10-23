import { CssBaseline, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getPlacesData, getWeatherData } from './api/index';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
const App = () => {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setfilteredPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState(0);

    const [autocomplete, setAutocomplete] = useState(null);

    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    useEffect(() => {
        const filtered = places?.filter((place) => Number(place.rating) >= rating);
        setfilteredPlaces(filtered)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating]);

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true);
            getWeatherData(coordinates.lat, coordinates.lng).then((data) => setWeatherData(data));
            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    // console.log(data);
                    setPlaces(data?.filter((place) => place.name && place.num_reviews >= 0));
                    setfilteredPlaces([]);
                    setIsLoading(false);
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, bounds]);
    // }, [type, coordinates, bounds]);

    const onLoad = (autoC) => {
        setAutocomplete(autoC);
    };

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoordinates({ lat, lng });
    };

    return (
        <>
            <CssBaseline />
            <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
};
export default App;