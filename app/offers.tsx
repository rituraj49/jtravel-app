import FlightCard from "@/components/FlightOfferCard";
import { useAppContext } from "@/context/AppContextProvider";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Offers() {
  const {flightOffers} = useAppContext();

  return (
    <View
      style={styles.container}
    >
      <ScrollView>
            {
              flightOffers.length > 0 && flightOffers.map((offer: any, index: number) => (
                <FlightCard
                  key={index}
                  flightData={offer} 
                />
              ))
            }
        {/* <Text style={styles.text}>offers screen</Text> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "black"
  },
  text: {
    color: "#fff"
  }
});