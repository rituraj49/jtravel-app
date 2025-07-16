import TravelerForm from "@/components/TravelerForm";
import { useAppContext } from "@/context/AppContextProvider";
import axios from "axios";
import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Button, List } from "react-native-paper";

export default function Booking() {
    const {travelers, setTravelers, selectedFlightOffer, apiUrl} = useAppContext();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const genderOptions = ["MALE", "FEMALE", "OTHER"];
    const documentTypeOptions = ["PASSPORT", "VISA", "GREEN_CARD"];
    const countryCallingCodes = ["+1", "+44", "+91", "+61", "+81"];
    const [loasing, setLoading] = useState(false);

    const handleAccordionPress = (index: number) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    }
    
    const handleChange = (field: string, index: number) => (value: string) => {
        const newTravelers = [...travelers];
        if(field.includes("document.")) {
            const docField = field.split('.')[1];
            newTravelers[index] = {
                ...newTravelers[index],
                document: {
                    ...newTravelers[index].document,
                    [docField]: value
                }

            }
        } else if(field.includes('phoneNumber.')) {
            const phoneField = field.split('.')[1];
            newTravelers[index] = {
                ...newTravelers[index],
                phoneNumber: {
                    ...newTravelers[index].phoneNumber,
                    [phoneField]: value
                }
            }
        } else {
            newTravelers[index] = {
                ...newTravelers[index],
                [field]: value
            }
        }
        setTravelers(newTravelers);
    };

    const handleBooking = async () => {
        try {
            setLoading(true);
            const bookingData = {
                flightOffer: selectedFlightOffer.pricingAdditionalInfo,
                travelers: travelers.map((traveler: any, index: number) => ({
                    id: index + 1,
                    firstName: traveler.firstName,
                    lastName: traveler.lastName,
                    dateOfBirth: traveler.dateOfBirth,
                    gender: traveler.gender,
                    email: traveler.email,
                    phones: [
                        {
                            deviceType: 'MOBILE',
                            countryCalingCode: traveler.phoneNumber.countryCallingCode,
                            number: traveler.phoneNumber.number
                        }
                    ],
                    documents: [ {...traveler.document, holder: true} ]
                }))
            }

            // const response = await axiosInstance.post("/booking/flight-order", bookingData)
            const response = await axios.post(`${apiUrl}/booking/flight-order`, bookingData)
            // console.log("Booking response:", response.data);
            alert(`Booking successful! Order ID: ${response.data.orderId}`);
        } catch (error) {
            console.error("Booking error:", error);
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView style={{ width: "100%", padding: 10, marginBottom: 20 }}>
            {
                // travelers.length > 0 && travelers.map((traveler: any, index: number) => (
                <FlatList
                    data={travelers}
                    renderItem={(({item, index}) => (
                        <List.Accordion
                            title={`Traveler ${index + 1}`}
                            left={props => <List.Icon {...props} icon="account" />}
                            expanded={expandedIndex === index}
                            onPress={() => handleAccordionPress(index)}
                        >
                            <TravelerForm 
                                traveler={item}
                                handleChange={handleChange}
                                index={index}
                                genderOptions={genderOptions}
                                documentTypeOptions={documentTypeOptions}
                                countryCallingCodes={countryCallingCodes}
                            />
                        </List.Accordion>
                    ))}
                    ListFooterComponent={
                        <View style={{ padding: 10 }}>
                             <Button mode="contained" onPress={handleBooking}>
                                Book
                            </Button>
                        </View>
                    }
                />
            }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  text: {
    color: "#fff"
  },
  input: {
    
  }
});