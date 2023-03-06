import { View, Image, Text, StyleSheet } from "react-native";

function Prevision({ pre }) {
  return (
    <>
      <View
        style={{
          marginHorizontal: 5,
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: "column",
          backgroundColor: "#DCDCDC",
          alignItems: "space-around",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {new Date(pre.dt_txt).toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "numeric",
          })}
        </Text>
        <Image
          source={{
            uri: `http://openweathermap.org/img/wn/${pre.weather[0].icon}@4x.png`,
          }}
          style={{ height: 150, width: 150 }}
        ></Image>
        <Text
          style={{
            fontSize: 24,
            color: "#222222",
            fontWeight: "bold",
          }}
        >
          {Math.floor(pre.main.temp)} <Text>°C</Text>
        </Text>
      </View>
    </>
  );
}

export default Prevision;
