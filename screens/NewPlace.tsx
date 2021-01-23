import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View, TextInput } from "react-native";
import { MainButton } from "../components";

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

const NewPlace = () => {
  const [titleValue, setTitleValue] = useState("");
  const titleChangeHandler = (text: string) => {
    setTitleValue(text);
  };
  const SavePlaceHandler = () => {
    
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
        <MainButton title="Sve Place" onPress={SavePlaceHandler} />
      </View>
    </ScrollView>
  );
};

export default NewPlace;
