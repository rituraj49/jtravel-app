import { theme } from '@/themes/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { Image, View } from 'react-native';
import { Badge, Card, Text } from 'react-native-paper';

export default function FlightCard({ flightData, handleSubmit, flightIndex }: 
    { flightData: any, handleSubmit: () => void, flightIndex: string }) {
    // const {setSelectedFlightOffer} = useAppContext();
    const { currencyCode, totalPrice, basePrice, seatsAvailable, trips } = flightData;
    // const router = useRouter();


    const formatDateTime = (dateTime: any) => {
        const date = new Date(dateTime);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    const handleBookFlight = () => {
        // console.log("Booking flight with data: ", flightData);
        // if(flightData) {
        //     setSelectedFlightOffer(flightData);
        //     router.push('/booking' as Route);
        // }
        handleSubmit();
    };

    return (
        <>
            <Card
                key={flightIndex} 
                style={{ margin: 10, borderWidth: 5, borderColor: theme.colors.primary }}
            >
                <LinearGradient
                    colors={[theme.colors.primary, theme.colors.primaryGlass]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        // flex: 1,
                        // margin: 10,
                        // borderWidth: 5,
                        borderColor: theme.colors.primaryGlass,
                        borderRadius: 12,
                        overflow: 'hidden',
                    }}
                >
                {
                    trips.map((trip: any, index: number) => {
                        const firstLeg = trip.legs[0];
                        const lastLeg = trip.legs[trip.legs.length - 1];
                        return (
                            <>
                            <Card.Title
                                style={{ paddingVertical: 0, marginBottom: -20 }}
                                // title={``} 
                                right={() => (
                                    <View style={{ alignItems: "center", marginRight: 10 }}>
                                        {(trip.tripType === "RETURN" && index === 1) && (
                                            <View style={{ 
                                                display: 'flex', flexDirection: 'row', 
                                                alignItems: 'center', justifyContent: 'center',
                                                marginBottom: 5, 
                                                backgroundColor: theme.colors.primary,
                                                borderRadius: 12,
                                                paddingHorizontal: 10
                                            }}
                                            >
                                                <Text variant="bodyMedium" style={{ color: theme.colors.disabled }}>Return</Text>
                                                <MaterialCommunityIcons 
                                                    name="arrow-u-left-top" 
                                                    size={16} color={theme.colors.disabled} />
                                            </View>
                                        )}
                                    </View>
                                )}
                                title={
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Image
                                            source={{ uri: `https://content.airhex.com/content/logos/airlines_${firstLeg.operatingCarrierCode}_100_100_s.png` }}
                                            style={{ width: 24, height: 24, marginRight: 8 }}
                                        />
                                        {/* <Text>Airline: {firstLeg.carrierName}</Text> */}
                                        <Text 
                                            variant='titleMedium' 
                                            style={{ fontWeight: "bold"}}
                                        >Air India</Text>
                                        {
                                            firstLeg.carrierCode !== firstLeg.operatingCarrierCode && (
                                                <>
                                                    <Text variant='bodySmall'> &nbsp; - (Operated by {firstLeg.operatingCarrierName})</Text>
                                                    <Image
                                                        source={{ uri: `https://content.airhex.com/content/logos/airlines_${firstLeg.operatingCarrierCode}_100_100_s.png` }}
                                                        style={{ width: 24, height: 24, marginRight: 8 }}
                                                    />
                                                </>
                                            )
                                        }
                                    </View>
                                } 
                                // subtitle={`Base: ${currencyCode} ${basePrice} | Seats Left: ${seatsAvailable}`}
                            />
                            <Card.Content style={{ paddingVertical: 5, }}>
                                {/* {trips.map((trip: any, index: number) => {
                                const firstLeg = trip.legs[0];
                                const lastLeg = trip.legs[trip.legs.length - 1];

                                return ( */}
                                    <View key={`leg-${index}`} style={{ marginBottom: 15, alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', 
                                        // borderWidth:1, borderColor: 'red'
                                    }}>
                                        {/* <Button onPress={()=>console.log(firstLeg)}>leg</Button>
                                        <View>
                                            <Text>{firstLeg.carrierCode}</Text>
                                        </View> */}
                                        {/* {
                                            firstLeg.operatingCarrierCode == firstLeg.carrierCode && (
                                                <View>

                                                </View>
                                            )
                                        } */}
                                        {/* <Text>lay{trip.totalLayoverDuration}</Text> */}
                                        <View style={{ alignItems: 'center' }}>
                                            <Text variant="titleMedium">{firstLeg.departureAirport}</Text>
                                            <Text variant="bodySmall">{formatDateTime(firstLeg.departureDateTime)}</Text>
                                        </View>

                                        {
                                            trip.stops > 0 ?
                                                (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                        {trip.legs.slice(0, -1).map((leg: any, legIdx: number) => (
                                                        <>
                                                            <View 
                                                                key={`leg-stop-${legIdx}`} 
                                                                style={{ alignItems: 'center', marginVertical: 5}}
                                                            >
                                                            <Badge style={{ width: 120, marginBottom: 5, fontSize: 12 }}>
                                                                {/* {`Layover: ${leg.layoverAfter}`} */}
                                                                {`Layover: ${trip.totalLayoverDuration}`}
                                                            </Badge>
                                                            <Text variant="bodySmall">{`at ${leg.arrivalAirport}`}</Text>
                                                            </View>
                                                            <View>
                                                                <Text variant="labelLarge">{`Stops: ${trip.stops}`}</Text>
                                                            </View>
                                                        </>
                                                        ))}
                                                    </View>) : (<View>
                                                        {/* <Text variant='bodyMedium'>Non-Stop</Text> */}
                                                        <Badge disabled style={{ width: 70, backgroundColor: theme.colors.success }}>
                                                            Non-Stop
                                                        </Badge>
                                                    </View>)
                                        }

                                        <View style={{ alignItems: 'center', marginTop: 5 }}>
                                            <Text variant="titleMedium">{lastLeg.arrivalAirport}</Text>
                                            <Text variant="bodySmall">{formatDateTime(lastLeg.arrivalDateTime)}</Text>
                                        </View>
                                    </View>
                                {/* );
                                })} */}
                            </Card.Content>
                            </>
                            
                        )
                    })
                }
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            borderTopWidth: 1,
                            borderTopColor: theme.colors.surfaceVariant,
                        }}
                    >
                        <View>
                            <Text variant="titleMedium">
                            {`Total: ${currencyCode} ${totalPrice}`}
                            </Text>
                            <Text variant="bodySmall" style={{ color: theme.colors.backdrop }}>
                            {`Base: ${currencyCode} ${basePrice}`}
                            </Text>
                        </View>

                        {/* Arrow Button */}
                        {/* <IconButton
                            icon="arrow-right"
                            size={24}
                            onPress={handleBookFlight}
                            mode="contained"
                        /> */}
                        <MaterialCommunityIcons 
                            name="menu-right"
                            size={24}
                            color={theme.colors.primary}
                            onPress={handleBookFlight}
                        />
                    </View>
                </LinearGradient>
            </Card>
        </>
    );
}