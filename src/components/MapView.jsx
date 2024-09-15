import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const GoogleMapComponent = ({ coordinates }) => {
  const defaultCenter = { lat: 6.9271, lng: 79.8612 }; // Default center for Sri Lanka

  const mapCenter = coordinates
    ? { lat: parseFloat(coordinates[1]), lng: parseFloat(coordinates[0]) }
    : defaultCenter;

  return (
    <LoadScript googleMapsApiKey="AIzaSyBKuZSWgJMFkhvzD4yIFQXgJzvfGVk9RKc">
      {" "}
      {/* Replace with your Google Maps API Key */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
      >
        {coordinates && <Marker position={mapCenter} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
