import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert, StyleSheet, Text } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Colors from "../../constants/Colors";
import { MainButton } from "../UI";
import MapView from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    flex: 1,
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
  const [pickedLocation, setPickedLocation]: any = useState({
    lat: 0,
    lng: 0,
  });
  const [isFetching, setIsFetching] = useState(false);

  const saveLocation = props.saveLocation;
  useEffect(() => {
    if (saveLocation) {
      setPickedLocation(saveLocation);
    }
  }, [saveLocation]);

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

  const pickOnMapHandler = () => {
    props.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      {isFetching ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <TouchableOpacity style={{ flex: 1 }} onPress={pickOnMapHandler}>
          {pickedLocation.lat !== 0 ? (
            <MapView
              style={styles.mapPreview}
              initialRegion={{
                latitude: pickedLocation.lat,
                longitude: pickedLocation.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          ) : (
            <Text>Please press Get user Location button </Text>
          )}
        </TouchableOpacity>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <MainButton
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <MainButton
          title="Pick on map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

export default LocationPicker;
