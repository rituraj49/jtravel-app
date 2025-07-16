import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

import { useState } from 'react';
import { Platform } from 'react-native';


type DatePickerInputProps = {
    // searchParams: any;
    dateType: string;
    handleChange: any;
    placeholderText: string;
    dateValue: string;
}

const DatePickerInput = ({
    // searchParams,
    handleChange,
    placeholderText,
    dateValue,
    dateType
}: DatePickerInputProps) => {
    const isWeb = Platform.OS === 'web'; 
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <View>
            {
                isWeb ? (
                    //  <RNTextInput
                    //      style={{
                    //         borderWidth: 1,
                    //         borderRadius: 4,
                    //         padding: 10,
                    //         borderColor: '#ccc',
                    //         marginVertical: 8
                    //     }}
                    //     value={dateValue}
                    //     placeholder={placeholderText}
                    //     onChange={(e) => {
                    //         console.log(e.nativeEvent.text)
                    //         // handleChange(dateType)(e.nativeEvent.text.split("T")[0]); // ISO string
                    //     }}
                    //     {...{ type: 'date' }} 
                    // />
                     <input
                        type="date"
                        value={dateValue || ''}
                        onChange={(e) => handleChange(dateType)(e.target.value)}
                        placeholder={placeholderText}
                        style={{ padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
                    />
                ) : (
                    <>
                        <TextInput
                            mode="outlined" 
                            style={styles.input} 
                            onPressIn={() => setShowDatePicker(true)}
                            onFocus={() => setShowDatePicker(true)}
                            value={dateValue ? new Date(dateValue).toLocaleDateString() : ''}
                            placeholder={placeholderText}
                            editable={false}
                            right={<TextInput.Icon icon="calendar" onPress={() => setShowDatePicker(true)} />}
                        />
                        {showDatePicker && (
                            <DateTimePicker
                            // value={searchParams["dateType"] ? new Date(searchParams["dateType"]) : new Date()}
                            value={dateValue ? new Date(dateValue) : new Date()}
                            mode="date"
                            display="calendar"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) {
                                    console.log("Selected Date: ", selectedDate);
                                    setSelectedDate(selectedDate);
                                    handleChange(dateType)(selectedDate.toISOString().split('T')[0]);
                                }
                            }}
                            />
                        )}
                    </>
                )
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    input: {
      marginBottom: 16,
    }
});

export default DatePickerInput;