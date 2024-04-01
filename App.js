import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { HomePage } from "./src/components/index.js";
export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <HomePage />
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
