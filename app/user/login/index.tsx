import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from "expo-router";
import { Button, Input } from "native-base";
import { signInUserWithEmail } from "../../../firebase/auth.js"
const login = () => {

    const [details, setUserDetails] = useState({ email: "", password: "" });
    const handleInputs = (key: string, value: string) => {
        console.log(key, value);
        setUserDetails({
            ...details,
            [key]: value
        });
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className="min-h-screen">
                {/* back button */}
                <View onTouchEnd={() => router.navigate("/")} className="mt-12 h-6 w-16 flex flex-row justify-evenly items-center">
                    <Image
                        className="w-4 aspect-square"
                        source={{
                            uri: "https://static.thenounproject.com/png/517807-200.png",
                        }}
                    />
                    <Text
                        className="text-base"
                        style={{ fontFamily: "montserrat-semibold" }}
                    >
                        Back
                    </Text>
                </View>

                {/* content */}
                <View className="mx-2">
                    {/* title */}
                    <Text
                        className="text-2xl mt-2 text-center"
                        style={{ fontFamily: "rufina-bold" }}
                    >
                        Sign in
                    </Text>

                    <View className="my-4 mt-8">
                        <Input onChangeText={(text) => handleInputs("email", text)} size="md" placeholder="email" />
                    </View>
                    <Input onChangeText={(pass) => handleInputs("password", pass)} size="md" placeholder="password" type='password' />


                    <View className="mt-4">
                        <Button bgColor={"#C3D8B3"} onPress={() => signInUserWithEmail({ email: details.email, pass: details.password })}>
                            <Text className="text-lg" style={{ fontFamily: "montserrat-bold" }}>Login</Text>
                        </Button>
                    </View>

                    <Text className="w-full text-center my-2 text-lg">or</Text>
                    {/* google button */}

                    <TouchableOpacity className="p-1 w-fit h-fit mx-auto bg-blue-400 flex flex-row justify-between items-center">
                        <View className="w-10 aspect-square bg-white"><Image className="h-full aspect-square" source={require("../../../assets/google.png")} /></View>
                        <Text className="pl-2 text-lg text-center" style={{ fontFamily: "montserrat-bold" }}>Continue with google</Text>
                    </TouchableOpacity>

                    <View className="flex flex-row mx-auto mt-2">
                        <Text className="mr-2" style={{ fontFamily: "montserrat-medium" }}>Don't have an account ?</Text>
                        <Link href="/user/register">
                            <Text className="text-blue-500" style={{ fontFamily: "montserrat-medium" }}>Click here</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default login

const styles = StyleSheet.create({})