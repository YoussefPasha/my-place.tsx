import Place from "../models/place";
import { ADD_PLACE, SET_PLACES } from "./places-actions";

const initialState: any = {
  places: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image
      );
      return {
        places: state.places.concat(newPlace),
      };
    case SET_PLACES:
      return {
        places: action.places.map(
          (pl: any) => new Place(pl.id.toString(), pl.title, pl.imageUri)
        ),
      };
    default:
      return state;
  }
};
