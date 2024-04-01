import { Button, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useFonts } from "expo-font";
const HomePage = () => {
    const [fontLoaded] = useFonts({
        "rufina-regular": require("../../assets/fonts/Rufina-Regular.ttf"),
        "rufina-bold": require("../../assets/fonts/Rufina-Bold.ttf"),
        "montserrat-normal": require("../../assets/fonts/Montserrat-normal.ttf")
    })
    return (
        <View className="mt-16 mx-2">
            <Text style={styles.welcomeHeading}>Welcome, 👋</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 py-4">
                <Text style={styles.categoryBtn}>Latest</Text>
                <Text style={[styles.categoryBtn, styles.selectedCategoryBtn]}>Technology</Text>
                <Text style={styles.categoryBtn}>Finance</Text>
                <Text style={styles.categoryBtn}>Politics</Text>
                <Text style={styles.categoryBtn}>Programming</Text>
            </ScrollView>

            {/* image and the top article */}
            <View className="overflow-hidden h-[224px] mt-6 relative" style={styles.topArticle}>
                <Image className="w-full h-full" source={{ uri: "https://plus.unsplash.com/premium_photo-1681492405224-b787ee736768?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} />

                {/*Heading and the author of the top article  */}
                <View className="z-10 absolute bottom-0 left-0 w-full h-20 px-2">
                    <View className=" w-full rounded-md h-9 flex justify-center items-center" style={styles.blogHeading}>
                        <Text className=" w-full text-left ml-2 text-base" style={{ fontFamily: "montserrat-normal" }}>How the political parties are effecting....</Text>
                    </View>
                    <View className="flex flex-row justify-end mt-2 items-center">
                        <View className="flex flex-row gap-2 items-center">
                            <Text className="text-sm" style={{ fontFamily: "montserrat-normal" }}>Nicolas johns.</Text>
                            <Image className="w-6 h-6 rounded-full" source={{ uri: "https://plus.unsplash.com/premium_photo-1681492405224-b787ee736768?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} />
                        </View>
                    </View>
                </View>
            </View>


            {/* Top articles */}
            <Text className="bg-red-400 my-4" style={{ fontFamily: "rufina-regular", fontSize: 28 }}>
                Latest From Technology
            </Text>


            {/* Articles */}
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
        borderRadius: 15
    },
    blogHeading: {
        backgroundColor: "#C3D8B3",

    }
})