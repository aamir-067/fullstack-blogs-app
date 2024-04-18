import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router } from "expo-router";
import { Button, Input, Stack } from "native-base";
const login = () => {
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
                        Sign Up
                    </Text>

                    <View className="mt-8">
                        <Input size="md" placeholder="name" />
                    </View>
                    <View className="my-4">
                        <Input size="md" placeholder="email" />
                    </View>
                    <Input size="md" placeholder="password" type='password' />


                    <View className="mt-4">
                        <Button>Sign Up</Button>
                    </View>

                    <Text className="w-full text-center my-2 text-lg">or</Text>
                    {/* google button */}

                    <TouchableOpacity className="w-8/12 mx-auto p-1 h-10 bg-blue-400 flex flex-row justify-between">
                        <Image className="h-full aspect-square" source={{ uri: "https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" }} />
                        <Text className=" h-full pl-2 text-lg text-center" style={{ fontFamily: "montserrat-medium" }}>Continue with google</Text>
                    </TouchableOpacity>

                    <View className="flex flex-row mx-auto mt-2">
                        <Text className="mr-2" style={{ fontFamily: "montserrat-medium" }}>Already have an account !</Text>
                        <Link href="/user/login">
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