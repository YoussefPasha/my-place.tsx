import React, { useState } from "react";
import { View, Text, ActivityIndicator, Alert, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Colors from "../../constants/Colors";
import { MainButton } from "../UI";

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
});

const LocationPicker = (props: any) => {
  const [pickedLocation, setPickedLocation]: any = useState();
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
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text> No Location chosen yet! </Text>
        )}
      </View>
      <MainButton
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

export default LocationPicker;
