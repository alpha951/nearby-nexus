import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import GoogleMapReact from "google-map-react";
import React from "react";
import mapStyles from "./mapsStyles";
import useStyles from "./styles";

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_APi_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}>
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}>
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom>
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  alt={place.name}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
                  <div  lat={weatherData.lat} lng={weatherData.lon}>
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`}
                      height="40px"
                      width = "40px"
                      alt={weatherData.current.weather[0].description}
                    />
                  </div>

              </Paper>
            )}
          </div>
        ))}
        {console.log(weatherData)}
        {/* {console.log(weatherData.current.weather[0].icon) } */}
       
      </GoogleMapReact>
    </div>
  );
};
export default Map;

