import { useAppContext } from '@/context/AppContextProvider';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { Badge, Button, Card, Divider, Text } from 'react-native-paper';

export default function FlightCard({ flightData }: { flightData: any }) {
    const {setSelectedFlightOffer} = useAppContext();
    const { currencyCode, totalPrice, basePrice, seatsAvailable, trips } = flightData;
    const router = useRouter();


    const formatDateTime = (dateTime: any) => {
        const date = new Date(dateTime);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    const handleBookFlight = () => {
        // console.log("Booking flight with data: ", flightData);
        if(flightData) {
            setSelectedFlightOffer(flightData);
            router.push('/booking');
        }
    };

    return (
        // <ScrollView>
        <Card style={{ margin: 10 }}>
            <Card.Title
                title={`Price: ${currencyCode} ${totalPrice}`}
                subtitle={`Base: ${currencyCode} ${basePrice} | Seats Left: ${seatsAvailable}`}
            />
            <Card.Content>
                {trips.map((trip: any, index: number) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                        <Text variant="titleMedium">
                            {trip.from} ➔ {trip.to}  ({trip.stops === 0 ? 'Non-stop' : `${trip.stops} Stop${trip.stops > 1 ? 's' : ''}`})
                        </Text>
                        <Text variant="bodySmall">Total Duration: {trip.totalFlightDuration}</Text>
                        {trip.legs.map((leg: any, legIdx: number) => (
                            <View key={legIdx} style={{ marginVertical: 5, paddingLeft: 10 }}>
                                <Text variant="bodyMedium">
                                    {leg.operatingCarrierCode} {leg.flightNumber} | Aircraft: {leg.aircraftCode}
                                </Text>
                                <Text variant="bodySmall">
                                    {leg.departureAirport} ({leg.departureTerminal}) ➔ {leg.arrivalAirport} ({leg.arrivalTerminal})
                                </Text>
                                <Text variant="bodySmall">
                                    Dep: {formatDateTime(leg.departureDateTime)} | Arr: {formatDateTime(leg.arrivalDateTime)}
                                </Text>
                                <Text variant="bodySmall">Duration: {leg.duration}</Text>
                                {leg.layoverAfter && (
                                    <Badge style={{ marginTop: 4, alignSelf: 'flex-start' }}>
                                        {`Layover: ${leg.layoverAfter}`}
                                    </Badge>
                                )}
                                <Divider style={{ marginTop: 5 }} />
                            </View>
                        ))}
                        {index < trips.length - 1 && <Divider style={{ marginVertical: 5 }} />}
                    </View>
                ))}
                <Button mode='contained' onPress={handleBookFlight}>Book Now</Button>
            </Card.Content>
        </Card>
        // {/* </ScrollView> */}
    );
}