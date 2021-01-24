import React, { useState } from "react";
import { View, ActivityIndicator, Alert, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Colors from "../../constants/Colors";
import { MainButton } from "../UI";
import MapView from "react-native-maps";

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const LocationPicker = (props: any) => {
  const [pickedLocation, setPickedLocation]: any = useState({
    lat: null,
    lng: null,
  });
  const [isFetching, setIsFetching] = useState(false);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const userLocation: any = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      console.log(userLocation);
      setPickedLocation({
        lat: userLocation.coords.latitude,
        lng: userLocation.coords.longitude,
      });
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      {isFetching ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <View style={styles.container}>
          <MapView
            style={styles.mapPreview}
            provider={null}
            initialRegion={{
              latitude: pickedLocation.lat ? pickedLocation.lat : 42.882004,
              longitude: pickedLocation.lng ? pickedLocation.lng : 74.582748,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          ></MapView>
        </View>
      )}
      <MainButton
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

export default LocationPicker;
