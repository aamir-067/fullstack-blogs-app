import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Footer from "../components/Footer/Footer";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { NativeBaseProvider } from "native-base";
import { Slot } from 'expo-router';
export default function App() {
  const [loaded, error] = useFonts({
    "rufina-regular": require("../assets/fonts/Rufina-Regular.ttf"),
    "rufina-bold": require("../assets/fonts/Rufina-Bold.ttf"),
    "montserrat-normal": require("../assets/fonts/Montserrat-normal.ttf"),
    "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-extrabold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
    "montserrat-light": require("../assets/fonts/Montserrat-Light.ttf"),
    "montserrat-medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-semibold": require("../assets/fonts/Montserrat-SemiBold.ttf")
  })

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <View className="">

        <View className="" style={{ height: "93%" }}>
          <Slot />
        </View>
        <Footer />

      </View>
    </NativeBaseProvider>

  );
}

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 50,
//     // flex: 1,
//     // backgroundColor: '#fff',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });
