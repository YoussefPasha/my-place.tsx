import React, { useEffect } from "react";
import { Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButton, PlaceItem } from "../components";
import * as placesActions from "../store/places-actions";

const PlacesList = (props: any) => {
  const { setOptions, navigate } = props.navigation;
  const places = useSelector((state: any) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add Places"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => {
              navigate("NewPlace", {
                param1: "",
              });
            }}
          />
        </HeaderButtons>
      ),
    });
    dispatch(placesActions.loadPlaces());
  }, [setOptions, navigate, dispatch]);
  return (
    <FlatList
      data={places}
      renderItem={(itemData: any) => (
        <PlaceItem
          image={itemData.item.image}
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
