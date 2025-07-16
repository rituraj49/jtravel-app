import { AppContextProvider } from "@/context/AppContextProvider";
import { theme } from "@/themes/theme";
import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
      <AppContextProvider>
        <PaperProvider theme={theme}>
            <Stack>
              <Stack.Screen name="index" options={{
                headerTitle: "Home",
                headerLeft: () => <></>
              }}/>
              
              <Stack.Screen name="about" options={{
                headerTitle: "ABout"
              }}  />
              
              <Stack.Screen name="+not-found" options={{
                headerShown: false
              }} />
            </Stack>
        </PaperProvider>
      </AppContextProvider>
  );
}
