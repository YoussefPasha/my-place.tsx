import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const PlaceDetail = (props: any) => {
  const { setOptions, navigate } = props.navigation;

  useEffect(() => {
    setOptions({
      headerTitle: props.route.params.placeTitle,
    });
  }, [setOptions]);
  return (
    <View>
      <Text>Places Detail</Text>
    </View>
  );
};

export default PlaceDetail;

const styles = StyleSheet.create({});
