import SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL , imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL ,lng REAL NOT NULL);",
        [],
        () => {
          res;
        },
        (_: any, error: any) => {
          rej(error);
        }
      );
    });
  });
  return promise;
};
