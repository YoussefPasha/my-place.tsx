import { registerRootComponent } from "expo";

export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (title: string, image: string) => {
  return { type: ADD_PLACE, placeData: { title, image } };
};
