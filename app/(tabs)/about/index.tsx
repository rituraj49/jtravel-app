import { useAppContext } from "@/context/AppContextProvider";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function About() {
  const { apiUrl, setApiUrl } = useAppContext();
  const [inputUrl, setInputUrl] = useState("");
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>about page.</Text>
       <TextInput
              label="set the api url"
              mode="outlined"
              style={{}}
              value={inputUrl}
              onChangeText={setInputUrl}
            />
            <Button mode='contained' onPress={() => setApiUrl(inputUrl.trim().toLowerCase()+":8080")}>set url</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  text: {
    color: "#fff"
  }
});