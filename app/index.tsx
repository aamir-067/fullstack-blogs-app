import { ScrollView, StyleSheet, Text, View, Image, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
const HomePage = () => {
    return (
        <SafeAreaView className="mx-2 mt-4">
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text className="" style={styles.welcomeHeading}>Welcome, 👋</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 py-4">
                    <Text style={[styles.categoryBtn, styles.selectedCategoryBtn]}> Latest</Text>
                    <Text style={[styles.categoryBtn]}>Technology</Text>
                    <Text style={styles.categoryBtn}>Finance</Text>
                    <Text style={styles.categoryBtn}>Politics</Text>
                    <Text style={styles.categoryBtn}>Programming</Text>
                    <Text style={styles.categoryBtn}>Other</Text>
                </ScrollView>
                {/* line */}
                <View className="w-full border-b-2 border-gray-200"></View>

                {/* image and the top article */}

                <Pressable>
                    <View className="w-full aspect-[4/3] mt-6 relative bg-red-400">
                        <Image className="w-full h-full" source={{ uri: "https://plus.unsplash.com/premium_photo-1681492405224-b787ee736768?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} />

                        {/*Heading and the author of the top article  */}
                        <View className="absolute bottom-0 left-0 w-full h-20 px-2">
                            <View className=" w-full rounded-md h-9 flex justify-center items-center" style={styles.blogHeading}>
                                <Text className=" w-full text-left ml-2 text-lg" style={{ fontFamily: "montserrat-regular" }}>How the political parties are effecting....</Text>
                            </View>
                            <View className="flex flex-row justify-end mt-2 items-center">
                                <View className="flex flex-row gap-2 items-center">
                                    <Text className="text-sm" style={{ fontFamily: "montserrat-light" }}>Nicolas johns.</Text>
                                    <Image className="w-6 h-6 rounded-full" source={{ uri: "https://plus.unsplash.com/premium_photo-1681492405224-b787ee736768?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>


                {/* Top articles */}
                <Text className=" my-4" style={{ fontFamily: "rufina-regular", fontSize: 28 }}>
                    Latest From Technology
                </Text>


                {/* Articles */}
                <View className="flex">
                    <View className="mb-4">
                    </View>
                    <View className="mb-4">
                        {/* <ArticleCard /> */}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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
        fontFamily: "rufina-bold"
    },
    catagories: {
        marginTop: 24
    },
    categoryBtn: {
        marginHorizontal: 16,
        fontFamily: "montserrat-regular",
        fontSize: 14,
        fontWeight: "600",
    },
    selectedCategoryBtn: {
        fontFamily: "montserrat-bold"
    },
    blogHeading: {
        backgroundColor: "#C3D8B3",

    }
})