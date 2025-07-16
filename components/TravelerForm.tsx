import { StyleSheet, View } from "react-native";
import { Button, RadioButton, TextInput } from "react-native-paper";
import DatePickerInput from "./DatePickerInput";
import MenuDropdown from "./MenuDropdown";

type TravelerFormType = {
    traveler: any,
    handleChange: (field: string, index: number) => (value: string) => void,
    index: number,
    genderOptions: string[],
    documentTypeOptions: string[],
    countryCallingCodes: string[]
}
export default function TravelerForm({
    traveler, 
    handleChange, 
    index, 
    genderOptions, 
    documentTypeOptions, 
    countryCallingCodes
}: TravelerFormType) {
    return (
        <View>
            <TextInput
                label="First Name"
                mode="outlined"
                value={traveler.firstName}
                onChangeText={(text) => handleChange('firstName', index)(text)}
                style={{ marginBottom: 10 }}
            />
            <TextInput
                label="Last Name"
                mode="outlined"
                value={traveler.lastName}
                onChangeText={(text) => handleChange('lastName', index)(text)}
                style={styles.input}
            />

                <RadioButton.Group
                onValueChange={(value) => handleChange('gender', index)(value)}
                value={traveler.gender}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    {
                        genderOptions.map((option: string) => (
                            <>
                                <RadioButton value={option} />
                                <Button>{option}</Button>
                            </>
                        ))
                    }
                </View>
            </RadioButton.Group>
            <TextInput
                label="Email"
                mode="outlined"
                value={traveler.email}
                onChangeText={(text) => handleChange('email', index)(text)}
                style={{ marginBottom: 10 }}
            />
            <DatePickerInput
                // showDatePicker={showDatePicker}
                // setShowDatePicker={setShowDatePicker}
                handleChange={(type: string) => (value: string) => handleChange(type, index)(value)}
                placeholderText="Date of Birth"
                dateValue={traveler.dateOfBirth ? new Date(traveler.dateOfBirth).toDateString() : ""}
                dateType='dateOfBirth'                     
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, gap: 10, alignItems: 'center' }}>
                <View style={{ flex: 2 }}>
                    <MenuDropdown
                        items={countryCallingCodes}
                        selectedItem={traveler.phoneNumber.countryCallingCode}
                        label="Code"
                        type="phoneNumber.countryCallingCode"
                        handleChange={(type) => (val) => handleChange(type, index)(val)}
                    />
                </View>
                <View style={{ flex: 7 }}>
                    <TextInput
                        label="Phone Number"
                        mode="outlined"
                        value={traveler.phoneNumber.number}
                        onChangeText={(text) => handleChange('phoneNumber.number', index)(text)}
                        style={styles.input}
                    />
                </View>
            </View>
            <MenuDropdown 
                items={documentTypeOptions}
                selectedItem={traveler.document.documentType}
                label="Type of Document"
                type="document.documentType"
                handleChange={(type) => (val) => handleChange(type, index)(val)}
            />
            <TextInput
                label="Birth Place"
                mode="outlined"
                value={traveler.document.birthPlace}
                onChangeText={(text) => handleChange('document.birthPlace', index)(text)}
                style={{ marginBottom: 10 }}
                placeholder="Ex - Delhi"
            />
            <TextInput
                label="Issuance Location"
                mode="outlined"
                value={traveler.document.issuanceLocation}
                onChangeText={(text) => handleChange('document.issuanceLocation', index)(text)}
                style={{ marginBottom: 10 }}
                placeholder="Ex - Delhi"
            />
            <TextInput
                label="ID Number"
                mode="outlined"
                value={traveler.document.number}
                onChangeText={(text) => handleChange('document.number', index)(text)}
                style={{ marginBottom: 10 }}
            />
            <DatePickerInput
                handleChange={(type: string) => (value: string) => handleChange(type, index)(value)}
                placeholderText="Issuance Date"
                dateValue={traveler.document.issuanceDate ? new Date(traveler.document.issuanceDate).toDateString() : ""}
                dateType='document.issuanceDate'                     
            />
            <DatePickerInput
                handleChange={(type: string) => (value: string) => handleChange(type, index)(value)}
                placeholderText="Expiry Date"
                dateValue={traveler.document.expiryDate ? new Date(traveler.document.expiryDate).toDateString() : ""}
                dateType='document.expiryDate'                     
            />
            <TextInput
                label="Issuance Country"
                mode="outlined"
                value={traveler.document.issuanceCountry}
                onChangeText={(text) => handleChange('document.issuanceCountry', index)(text)}
                style={{ marginBottom: 10 }}
                placeholder="ISO Code - IN, US"
            />
            <TextInput
                label="Validity Country"
                mode="outlined"
                value={traveler.document.validityCountry}
                onChangeText={(text) => handleChange('document.validityCountry', index)(text)}
                style={{ marginBottom: 10 }}
                placeholder="ISO Code - IN, US"
            />
            <TextInput
                label="Nationality"
                mode="outlined"
                value={traveler.document.nationality}
                onChangeText={(text) => handleChange('document.nationality', index)(text)}
                style={{ marginBottom: 10 }}
                placeholder="ISO Code - IN, US"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderRadius: 1,
    }
})