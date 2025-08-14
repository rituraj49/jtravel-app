import TravelerDetails from "@/components/TravelerDetails";
import TripDetails from "@/components/TripDetails";
import { useAppContext } from "@/context/AppContextProvider";
import { Dimensions, FlatList, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";

function confirmation() {
    // const { flightBooking } = useContext(AppContext);
    let bookingData = null;
    if(Platform.OS === 'web') {
      const flightBookingStr = localStorage.getItem('flightBooking');
      
      bookingData = flightBookingStr ? JSON.parse(flightBookingStr) : null;
    } else {
        const { flightBooking } = useAppContext();
        bookingData = flightBooking;
    }

     const { orderId, travelers, flightOffer } = bookingData || {};
      // const formatDateTime = (dateTime: any) => {
      //   const date = new Date(dateTime);
      //   return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      // };

      const formatTime = (dt: string) =>
        new Date(dt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      const formatDate = (dt: string) =>
        new Date(dt).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' });

    
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card style={{ borderRadius: 10 }}>
        <Card.Content>
          <Text variant="titleLarge">Flight Confirmed</Text>
          <Text variant="bodyMedium">Order ID: {orderId}</Text>
          <Text variant="bodyMedium">
            Total Price: {flightOffer.totalPrice} {flightOffer.currencyCode}
          </Text>
          <Text variant="bodyMedium" style={{ marginTop: 8, color: "#388e3c" }}>
            An email with the booking details has been sent to your email id.
          </Text>
        </Card.Content>
      </Card>

      <Divider style={{ marginVertical: 16 }} />

       <Text variant="titleLarge">Itinerary</Text>
      {flightOffer.trips.map((trip: any, idx: number) => (
        <>
          <TripDetails 
            trip={trip}
            tripIndex={`trip-${idx}`}
          />
        </>
          // <Card key={idx} style={{ marginBottom: 16 }}>
          //   <Card.Content>
          //     <View
          //       style={{
          //         display: "flex", 
          //         flexDirection: "column", 
          //         justifyContent: "space-between",
          //         alignContent: "center",
          //         marginBottom: 0,
          //       }}
          //     >
          //       <View style={{
          //         display: "flex", 
          //         flexDirection: "row", 
          //         justifyContent: "space-between",
          //         alignItems: "center",
          //         marginBottom: 0,
          //       }}>
          //         <View style={{alignItems: "center"}}>
          //           <Text style={styles.code}>{trip.from}</Text>
          //           <Text style={styles.date}>{formatDate(trip.legs[0].departureDateTime)}</Text>
          //           <Text style={styles.time}>{formatTime(trip.legs[0].departureDateTime)}</Text>
          //         </View>

          //         <View style={{marginTop: 20, alignItems: "center"}}>
          //           <List.Icon 
          //             icon="airplane" 
          //             color={theme.colors.backdrop} 
          //           />
          //         </View>
                  
          //         <View style={{alignItems: "center"}}>
          //           <Text style={styles.code}>{trip.to}</Text>
          //           <Text style={styles.date}>{formatDate(trip.legs[trip.legs.length - 1].arrivalDateTime)}</Text>
          //           <Text style={styles.time}>{formatTime(trip.legs[trip.legs.length - 1].arrivalDateTime)}</Text>
          //         </View>
          //       </View>
          //       <View style={{alignContent: "center", alignItems: "center"}}>
          //         <Text variant="bodyMedium" style={{ color: "#888" }}>
          //           Total Duration: {trip.totalFlightDuration}
          //         </Text>
          //         <Text variant="bodyMedium" style={{ color: "#888" }}>
          //           Stops: {trip.stops} {trip.stops > 1 ? "stops" : "stop"}
          //         </Text>
          //         <Text variant="bodyMedium" style={{ color: "#888" }}>
          //           Layover: {trip.totalLayoverDuration}
          //         </Text>
          //       </View>
          //     </View>
          //     {/* <Text variant="titleMedium">
          //       {trip.from} ➝ {trip.to}
          //     </Text>
          //     <Text>Total Duration: {trip.totalFlightDuration}</Text>
          //     <Text>Stops: {trip.stops}</Text>
          //     <Text>Layover: {trip.totalLayoverDuration}</Text> */}

          //     <Divider style={{ marginVertical:10 }} />

          //     <FlatList
          //       data={trip.legs}
          //       keyExtractor={(item, index) => `leg-${index}`}
          //       horizontal
          //       // pagingEnabled
          //       renderItem={({ item, index, separators }) => (
          //         <>
          //         <View style={{ 
          //           flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          //           marginRight: 0, 
          //           paddingLeft: 10,
          //           width: "100%", 
          //           // borderWidth: 1, borderColor: 'red' 
          //         }}>
          //           <View style={{alignItems: "center", marginRight: 0}}>
          //             <Text style={styles.legCode}>{item.departureAirport}</Text>
          //             <Text style={styles.legDate}>{formatDate(item.departureDateTime)}</Text>
          //             <Text style={styles.legTime}>{formatTime(item.departureDateTime)}</Text>
          //             <Text style={styles.legTerminal}>T{item.departureTerminal}</Text>
          //           </View>

          //           <View style={{marginTop: 0, marginRight: 0, alignItems: "center", alignContent: "center"}}>
          //             {/* <List.Icon 
          //               icon="airplane" 
          //               color={MD3Colors.secondary30} 
          //             /> */}
          //             <List.Item
          //               title={`Flight ${item.operatingCarrierCode}${item.flightNumber}`}
          //               description={`Aircraft: ${item.aircraftCode}`}
          //               style={{marginBottom: 15}}
          //               titleStyle={{ fontWeight: 'bold', fontSize: 14 }}
          //               descriptionStyle={{ color: '#666', fontSize: 12 }}
          //               contentStyle={{ alignItems: 'center' }}
          //               // left={() => <List.Icon icon="airplane" />}
          //           />

          //           </View>
                    
          //           <View style={{alignItems: "center", marginRight: 10}}>
          //             <Text style={styles.legCode}>{item.arrivalAirport}</Text>
          //             <Text style={styles.legDate}>{formatDate(item.arrivalDateTime)}</Text>
          //             <Text style={styles.legTime}>{formatTime(item.arrivalDateTime)}</Text>
          //             <Text style={styles.legTerminal}>T{item.arrivalTerminal}</Text>
          //           </View>
          //         </View>
          //         {/* {item.layoverAfter && (
          //             <Badge style={{ marginTop: 4, fontSize: 12, paddingLeft: 8, paddingRight: 8, width: 110, marginBottom: 10 }}>
          //               {`Layover: ${item.layoverAfter}`}
          //             </Badge>
          //         )} */}
          //           {
          //             index < trip.legs.length - 1 && 
          //             <View style={{
          //                 // borderWidth: 3,
          //                 // borderColor: 'red',
          //                 // marginRight: 10,
          //                 width: 1, 
          //                 height: '100%', 
          //                 backgroundColor: theme.colors.background, 
          //                 // marginHorizontal: 10
          //                 // marginRight: 10 
          //               }} 
          //             />
          //           }
          //         </>
          //       )}
          //     />
          //   </Card.Content>
          // </Card>
      ))}

      <Text variant="titleLarge">Passenger Details</Text>
      <FlatList 
        data={travelers}
        keyExtractor={(_, index) => `trav ${index + 1}`}
        horizontal
        // numColumns={1}
        renderItem={({ item,  index }) => (
          <View
            style={{
              width: travelers.length === 1 ? Dimensions.get('window').width : 250,
              marginRight: travelers.length === 1 ? 0 : 12,
            }}
          >
            <TravelerDetails 
              traveler={item}
              key={index}
              style={{
                // width:
                //   travelers.length === 1
                //     ? '100%'
                //     : 250,
                // marginRight: travelers.length === 1 ? 0 : 12,
              }}
            />
          </View>
        )}
      />
      {/* {travelers.map((traveler: any, idx: number) => (
        <TravelerDetails 
          traveler={traveler}
          key={idx}
        />
      ))} */}

      <Divider style={{ marginVertical: 16 }} />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  code: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  legCode: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  legTerminal: {
    fontSize: 11,
    fontWeight: 'condensedBold',
  },
  legTime: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  legDate: {
    fontSize: 10,
    color: 'gray',
  },
})
export default confirmation;