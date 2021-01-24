import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton } from "../components";

const Map = (props: any) => {
  const { setOptions, navigate } = props.navigation;
  const [selectedLocation, setSelectedLocation]: any = useState({
    lat: 0,
    lng: 0,
  });

  const savePickedLocation = () => {
    if (!selectedLocation) {
      return;
    }

    navigate("NewPlace", {
      saveLocation: selectedLocation,
    });
  };

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={savePickedLocation}
          />
        </HeaderButtons>
      ),
    });
  }, [setOptions, savePickedLocation]);

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  const selectLocationHandler = (e: any) => {
    setSelectedLocation({
      lat: e.nativeEvent.coordinate.latitude,
      lng: e.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <MapView
      region={mapRegion}
      style={{ flex: 1 }}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

export default Map;
