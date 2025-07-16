import { StyleSheet, Text, View } from "react-native";

export default function About() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>about page.</Text>
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