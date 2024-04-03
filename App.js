import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { HomePage, ArticlePreview } from "./src/components/index.js";
import Footer from './src/components/Footer/Footer.jsx';
export default function App() {

  return (
    <SafeAreaView className="">
      <StatusBar style="auto" />


      <View className="pt-10" style={{ height: "93%" }}>
        {/* <HomePage /> */}
        <ArticlePreview />
      </View>

      <Footer />

    </SafeAreaView>
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
