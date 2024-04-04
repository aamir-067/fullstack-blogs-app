import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeSVG from "../../assets/home.svg"
import BlogSVG from "../../assets/blog-pencil.svg"
import ProfileSVG from "../../assets/user.svg"
import { Link } from 'expo-router'

const Footer = () => {
    return (
        <View className="w-full flex flex-row z-50 justify-evenly items-center" style={{ backgroundColor: "#203406", height: "7%", width: "100%" }}>
            <Link href="/">
                <View className="w-11 aspect-square flex items-center justify-center">
                    <View className="w-6 aspect-square bg-white rounded-full"></View>
                    <Text className="text-xs mt-1 text-white" style={{ fontFamily: "montserrat-medium" }}>Home</Text>
                </View>
            </Link>
            <Link href="/article/preview">
                <View className="w-11 aspect-square flex items-center justify-center">
                    <View className="w-6 aspect-square bg-white rounded-full"></View>
                    <Text className="text-xs mt-1 text-white" style={{ fontFamily: "montserrat-medium" }}>Blogs</Text>
                </View>
            </Link>
            <Link href={"/profile"}>
                <View className="w-11 aspect-square flex items-center justify-center">
                    <View className="w-6 aspect-square bg-white rounded-full"></View>
                    <Text className="text-xs mt-1 text-white" style={{ fontFamily: "montserrat-medium" }}>Profile</Text>
                </View>
            </Link>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({})