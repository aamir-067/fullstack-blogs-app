import { SafeAreaView, View, StatusBar, LogBox } from 'react-native';
import Footer from "../components/Footer/Footer";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { NativeBaseProvider } from "native-base";
import { Slot } from 'expo-router';
import { store } from '../store/store';
import { Provider } from 'react-redux';



SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
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
    (async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    })()
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }



  LogBox.ignoreLogs(["fontFamily"]);
  LogBox.ignoreAllLogs(true);

  return (
    <NativeBaseProvider>
      <StatusBar hidden={true} />
      <SafeAreaView className="">

        <View className="" style={{ height: "93%" }}>
          <Provider store={store}>
            <Slot />
          </Provider>
        </View>
        <Footer />

      </SafeAreaView>
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
