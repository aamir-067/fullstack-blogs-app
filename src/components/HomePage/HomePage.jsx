import { Button, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useFonts } from "expo-font";
const HomePage = () => {
    const [fontLoaded] = useFonts({
        "rufina-regular": require("../../assets/fonts/Rufina-Regular.ttf"),
        "montserrat-normal": require("../../assets/fonts/Montserrat-normal.ttf")
    })
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeHeading}>Welcome, 👋</Text>

            <ScrollView horizontal style={styles.catagories}>
                <Text style={styles.categoryBtn}>Latest</Text>
                <Text style={[styles.categoryBtn, styles.selectedCategoryBtn]}>Technology</Text>
                <Text style={styles.categoryBtn}>Finance</Text>
                <Text style={styles.categoryBtn}>Politics</Text>
                <Text style={styles.categoryBtn}>Programming</Text>
            </ScrollView>

            {/* image and the top article */}
            <View style={styles.topArticle}>
                <Image source={{ uri: "https://plus.unsplash.com/premium_photo-1681492405224-b787ee736768?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} />

                <View>

                </View>
            </View>
        </View>
    )
}

export default HomePage

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        marginHorizontal: 8
    },
    welcomeHeading: {
        fontSize: 32,
        fontFamily: "rufina-regular"
    },
    catagories: {
        marginTop: 24
    },
    categoryBtn: {
        marginHorizontal: 16,
        fontFamily: "montserrat-normal",
        fontSize: 14,
        fontWeight: "600",
    },
    selectedCategoryBtn: {
        fontWeight: "bold"
    },
    topArticle: {
        backgroundColor: "#999",
        height: 224,
        marginTop: 32,
        borderRadius: 15
    }
})