import React, { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton } from "../components";

const styles = StyleSheet.create({});
const PlacesList = (props: any) => {
  const { setOptions, navigate } = props.navigation;

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add Places"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => {
              navigate("NewPlace");
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [setOptions, navigate]);
  return (
    <View>
      <Text>Places List</Text>
    </View>
  );
};

export default PlacesList;
