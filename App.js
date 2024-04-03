import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { HomePage, ArticlePreview } from "./src/components/index.js";
import Footer from './src/components/Footer/Footer.jsx';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
export default function App() {
  const [loaded, error] = useFonts({
    "rufina-regular": require("./src/assets/fonts/Rufina-Regular.ttf"),
    "rufina-bold": require("./src/assets/fonts/Rufina-Bold.ttf"),
    "montserrat-normal": require("./src/assets/fonts/Montserrat-normal.ttf"),
    "montserrat-bold": require("./src/assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-extrabold": require("./src/assets/fonts/Montserrat-ExtraBold.ttf"),
    "montserrat-light": require("./src/assets/fonts/Montserrat-Light.ttf"),
    "montserrat-medium": require("./src/assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-regular": require("./src/assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-semibold": require("./src/assets/fonts/Montserrat-SemiBold.ttf")
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
    <View className="">
      <StatusBar style="auto" />

      <View className="pt-10" style={{ height: "93%" }}>
        {/* <HomePage /> */}
        <ArticlePreview />
      </View>

      <Footer />

    </View>
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
