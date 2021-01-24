import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { LocationPicker, MainButton, ImagePicker } from "../components";
import * as placesActions from "../store/places-actions";

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  text: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

const NewPlace = (props: any) => {
  const { navigate } = props.navigation;
  const [titleValue, setTitleValue] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const titleChangeHandler = (text: string) => {
    setTitleValue(text);
  };
  const SavePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, image));
    navigate("Places");
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.text}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={(imagePath: any) => setImage(imagePath)} />
        <LocationPicker />
        <View style={{ alignItems: "center" }}>
          <MainButton
            title="Save Place"
            color={"#303F9F"}
            onPress={SavePlaceHandler}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default NewPlace;
