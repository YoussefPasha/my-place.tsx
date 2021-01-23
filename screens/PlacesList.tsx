import React, { useEffect } from "react";
import { Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import { HeaderButton, PlaceItem } from "../components";

const PlacesList = (props: any) => {
  const { setOptions, navigate } = props.navigation;
  const places = useSelector((state: any) => state.places.places);

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
    <FlatList
      data={places}
      renderItem={(itemData: any) => (
        <PlaceItem
          image={null}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            navigate("PlacesDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

export default PlacesList;
