import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL , imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL ,lng REAL NOT NULL);",
        [],
        (_: any, result: any) => {
          res(result);
        },
        (_: any, error: any) => {
          rej(error);
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (
  title: string,
  imageUri: string,
  address: string,
  lat: number,
  lng: number
) => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
        [title, imageUri, address, lat, lng],
        (_: any, result: any) => {
          res(result);
        },
        (_: any, error: any) => {
          rej(error);
        }
      );
    });
  });
  return promise;
};
