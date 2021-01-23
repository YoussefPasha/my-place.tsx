import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { MainButton } from "../components";
import * as placesActions from "../store/places-actions";
import { ImagePicker } from "../components";

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
  const { setOptions, navigate } = props.navigation;
  const [titleValue, setTitleValue] = useState("");
  const dispatch = useDispatch();
  const titleChangeHandler = (text: string) => {
    setTitleValue(text);
  };
  const SavePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue));
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
        <ImagePicker />
        <MainButton title="Save Place" onPress={SavePlaceHandler} />
      </View>
    </ScrollView>
  );
};

export default NewPlace;
