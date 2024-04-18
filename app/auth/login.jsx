import { StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native'
import React from 'react'
import { Input, Stack } from "native-base";

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
                        Login To Account
                    </Text>

                    <View className="mb-4">
                        <Input size="md" placeholder="email" />
                    </View>
                    <Input size="md" placeholder="password" type='password' />
                </View>
            </View>
        </ScrollView>
    )
}

export default login

const styles = StyleSheet.create({})