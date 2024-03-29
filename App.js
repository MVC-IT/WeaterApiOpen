import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  FlatList,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

import Prevision from "./components/Prevision";

const myAPI = "f78a09c17d23daf101868fff5e523cc0";

export default function App() {
  const [location, setLocation] = useState(null);
  const [cityData, setCityData] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [prevision, setPrevision] = useState("");

  const getWeather = async (lat, long) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${myAPI}&units=metric&lang=fr`
    );
    const data = await response.json();
    setCityData(data);
    setWeatherIcon(data.weather[0].icon);
    //console.log(data);
  };
  {
    /*Configuration des données pour les prévisions*/
  }
  const getPrevisionWeather = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myAPI}&units=metric&lang=fr`
    );
    const datas = await response.json();
    setPrevision(datas.list);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission n'est pas accepter");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      getWeather(location.coords.latitude, location.coords.longitude);
      getPrevisionWeather(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 28,
          textAlign: "center",
          color: "#F400A1",
          fontStyle: "italic",
        }}
      >
        Code name Vice city
      </Text>
      {/* Affichage du nom de la ville */}
      {cityData ? (
        <View
          style={{
            flex: 0.2,
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            paddingTop: 100,
          }}
        >
          <Text
            style={{
              fontSize: 28,
            }}
          >
            {cityData.name}
          </Text>
          <Text style={{ fontSize: 48, paddingTop: 25 }}>
            {Math.floor(cityData.main.temp)} °C
          </Text>
        </View>
      ) : (
        <ActivityIndicator size="large" color="pink" />
      )}

      {weatherIcon ? (
        <View
          style={{
            flex: 0.5,
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherIcon}@4x.png`,
            }}
            style={{ width: 200, height: 200 }}
          />
          <Text style={{ fontSize: 28, paddingTop: 25 }}>
            {cityData.weather[0].description}
          </Text>
        </View>
      ) : (
        <ActivityIndicator size="large" color="pink" />
      )}

      {/* Affichage de la température*/}

      {prevision ? (
        <View style={{ flex: 0.3 }}>
          {console.log(prevision)}

          <FlatList
            data={prevision}
            keyExtractor={(item) => item.dt.toString()}
            horizontal={true}
            renderItem={({ item }) => <Prevision pre={item} />}
          />
        </View>
      ) : (
        <ActivityIndicator size="large" color="pink" />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
