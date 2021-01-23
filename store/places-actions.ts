import * as FileSystem from "expo-file-system";
export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (title: string, image: string) => {
  return async (dispatch: any) => {
    const fileName: string | any = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }

    dispatch({ type: ADD_PLACE, placeData: { title, image: newPath } });
  };
};
