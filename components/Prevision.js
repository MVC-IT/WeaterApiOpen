import { View, Image, Text, StyleSheet } from "react-native";

{
  /* Affichage du composant  */
}

function Prevision({ pre }) {
  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: "column",
          backgroundColor: "#DCDCDC",
          alignItems: "space-around",
          borderRadius: 20,
          backgroundColor: "#00a8ff",
        }}
      >
        <Text
          style={{
            color: "#000000",
            fontSize: 18,
            fontStyle: "italic",
            
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
            color: "black",
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
