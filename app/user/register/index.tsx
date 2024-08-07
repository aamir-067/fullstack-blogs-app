import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Link, router } from "expo-router";
import { Button, Input } from "native-base";
import { createEmailAndPassUser, signInWithGoogle } from '../../../firebase/auth';
const login = () => {
    const [input, setInput] = React.useState({
        name: "",
        email: '',
        password: ''
    })


    const handleInputChange = (value: string, inputName: string) => {
        setInput({
            ...input,
            [inputName]: value
        })
    }


    const signUp = async () => {
        try {
            const res = await createEmailAndPassUser({ ...input })
            if (!res) {
                Alert.alert("Error", "Error while signUp")
            }
        } catch (error) {
            console.log(error);

            Alert.alert("Error", "Error while signUp");
        }
    }




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
                        <Input onChangeText={(value) => handleInputChange(value, "name")} size="md" placeholder="name" />
                    </View>
                    <View className="my-4">
                        <Input onChangeText={(value) => handleInputChange(value, "email")} size="md" placeholder="email" />
                    </View>
                    <Input size="md" onChangeText={(value) => handleInputChange(value, "password")} placeholder="password" type='password' />


                    <View className="mt-4">
                        <Button onPress={() => signUp()} bgColor={"#C3D8B3"}>
                            <Text className="text-lg" style={{ fontFamily: "montserrat-bold" }}>Login</Text>
                        </Button>
                    </View>

                    <Text className="w-full text-center my-2 text-lg">or</Text>
                    {/* google button */}

                    <TouchableOpacity onPress={() => signInWithGoogle()} className="p-1 w-fit h-fit mx-auto bg-blue-400 flex flex-row justify-between items-center">
                        <View className="w-10 aspect-square bg-white"><Image className="h-full aspect-square" source={require("../../../assets/google.png")} /></View>
                        <Text className="pl-2 text-lg text-center" style={{ fontFamily: "montserrat-bold" }}>Continue with google</Text>
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