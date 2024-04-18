import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Footer = () => {
    return (
        <View className="w-full flex flex-row z-50 justify-evenly items-center" style={{ backgroundColor: "#203406", height: "7%", width: "100%" }}>
            <Link href="/">
                <View className=" flex items-center justify-center">
                    <View className="w-6 aspect-square rounded-full">
                        <Image className="w-full h-full" source={require("../../assets/home.png")} />
                    </View>
                    <Text className="text-xs mt-1 text-white" style={{ fontFamily: "montserrat-medium" }}>Home</Text>
                </View>
            </Link>
            <Link href="/article/preview">
                <View className="flex items-center justify-center">
                    <View className="w-6 aspect-square rounded-full">
                        <Image className="w-full h-full" source={require("../../assets/blog-write.png")} />
                    </View>
                    <Text className="text-xs mt-1 text-white" style={{ fontFamily: "montserrat-medium" }}>Publish</Text>
                </View>
            </Link>
            <Link href={"/profile"}>
                <View className=" flex items-center justify-center">
                    <View className="w-6 aspect-square rounded-full">
                        <Image className="w-full h-full" source={require("../../assets/person.png")} />
                    </View>
                    <Text className="text-xs mt-1 text-white" style={{ fontFamily: "montserrat-medium" }}>Profile</Text>
                </View>
            </Link>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({})