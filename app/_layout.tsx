import { AppContextProvider } from "@/context/AppContextProvider";
import { theme } from "@/themes/theme";
import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
      <AppContextProvider>
        <PaperProvider theme={theme}>
          {/* <Slot /> */}

            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.background,
                headerTitleStyle: {
                  fontWeight: 'bold'
                },
              }}
            >
              <Stack.Screen name="(tabs)" options={{
                headerTitle: "FlightMate",
                headerLeft: () => <></>,
                headerShown: false
                
              }}/>
              <Stack.Screen name="booking" options={{
                headerLeft: () => <></>,
                headerShown: false
                
              }}/>
              {/* <Stack.Screen name="index" options={{
                headerTitle: "FlightMate",
                headerLeft: () => <></>,
                // headerShown: false
                
              }}/>

              <Stack.Screen name="offers" options={{
                headerTitle: "Search results",
                // headerLeft: () => <></>
              }}/>
              
              <Stack.Screen name="about" options={{
                headerTitle: "ABout"
              }}  />
              
              <Stack.Screen name="+not-found" options={{
                headerShown: false
              }} /> */}
            </Stack>
        </PaperProvider>
      </AppContextProvider>
  );
}
