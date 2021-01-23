import React from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "../screens/Map";
import NewPlace from "../screens/NewPlace";
import PlacesDetail from "../screens/PlaceDetail";
import PlacesList from "../screens/PlacesList";
import Colors from "../constants/Colors";

const PlacesStack = createStackNavigator();

const PlacesNavigator = () => {
  return (
    <PlacesStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      }}
    >
      <PlacesStack.Screen
        name="Places"
        component={PlacesList}
        options={{
          headerTitle: "All Places",
          headerTitleStyle: { fontSize: 25, fontWeight: "normal" },
        }}
      />
      <PlacesStack.Screen name="PlacesDetail" component={PlacesDetail} />
      <PlacesStack.Screen name="NewPlace" component={NewPlace} />
      <PlacesStack.Screen name="Map" component={Map} />
    </PlacesStack.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <StatusBar animated />
      <PlacesNavigator />
    </NavigationContainer>
  );
};

export default MainNavigation;
