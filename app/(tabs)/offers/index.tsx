import FlightCard from "@/components/FlightOfferCard";
import { useAppContext } from "@/context/AppContextProvider";
import { theme } from "@/themes/theme";
import { router, useNavigation } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Icon, IconButton, Text } from "react-native-paper";

export default function Offers() {
  const {setSelectedFlightOffer} = useAppContext();
  const {flightOffers, searchParams, fromInput, toInput} = useAppContext();
  const navigation = useNavigation();
  
  // const tempFlights = 
  const handleBookFlight = (flightData: any) => {
    // console.log("Booking flight with data: ", flightData);
    if(flightData) {
      setSelectedFlightOffer(flightData);
      // navigation.navigate("../booking/index");
      router.push("/booking/flightDetails");
    }
  };
  // useEffect(() => {
  //   if(searchParams.from && searchParams.to) {
  //     navigation.setOptions({
  //       headerTitle: `Offers from ${searchParams.from} to ${searchParams.to}`
  //     });
  //   }
  // }, []);
  return (
    <View
      style={styles.container}
    >
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 0}}>
        <View style={[styles.routeCard, {display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row',  width: '75%', }]}>
          {/* <Text style={styles.routeLabel}>From</Text> */}
          <View>
            <Text style={styles.routeValue}>{searchParams.from}</Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Icon source="airplane" size={24} />
            <Text>{searchParams.departureDate}</Text>
          </View>
          {/* <Text style={styles.routeLabel}>To</Text> */}
          <View>
            <Text style={styles.routeValue}>{searchParams.to}</Text>
          </View>
        </View>
        {/* <View style={{ marginRight: 10 }}> */}
          <IconButton 
            icon={"pencil-outline"}
            size={24}
            // onPress={() => navigation.navigate("home/index")}
            onPress={() => router.push("/(tabs)/home")}
          />
        {/* </View> */}
      </View>
      <ScrollView>
            {
              flightOffers.length > 0 ? flightOffers.map((offer: any, index: number) => (
                // tempFlights.flightsAvailable.length > 0 ? tempFlights.flightsAvailable.map((offer: any, index: number) => (
                <FlightCard
                  flightIndex={`flight-${index}`}
                  flightData={offer} 
                  handleSubmit={() => handleBookFlight(offer)}
                />
              )) : (
                <View style={{ padding: 10, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: theme.colors.backdrop}}>No flight offers found for {fromInput} to {toInput} on {searchParams.departureDate}</Text>
                </View>
              )
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
  },
  routeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    marginHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0,
    alignItems: "center",
  },
  routeLabel: {
    fontSize: 14,
    color: "#888",
    fontWeight: "bold",
    marginTop: 4,
  },
  routeValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
});