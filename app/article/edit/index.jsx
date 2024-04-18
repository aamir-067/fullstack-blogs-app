import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
import React from 'react'
import { Input, TextArea, Button } from "native-base";
import { router } from "expo-router";

const Upload = () => {



    const getPicture = async () => {
        const res = await DocumentPicker.getDocumentAsync({
            type: "image/*",
            copyToCacheDirectory: true
        });

        if (res?.canceled == false) {
            console.log(res?.assets[0]);
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
                        Edit Blog
                    </Text>


                    {/* Image */}

                    <TouchableOpacity onPress={getPicture} className="w-full mt-4 aspect-[3/2] flex justify-center items-center" style={{ backgroundColor: "#C3D8B3" }}>
                        <Image className="aspect-square  h-4/5" source={require("../../../assets/image_icon.png")} />
                    </TouchableOpacity>


                    <Input size="md" marginY={4} placeholder="Title" value='prev value' />
                    <Input size="md" marginY={4} placeholder="Reading time" value='4 min' />
                    <TextArea h={40} placeholder="Text Area Placeholder" fontSize={"sm"} value='lorem ipsum dollar emit' />

                    <Button bgColor={"#C3D8B3"} marginTop={4}>
                        <Text style={{ fontFamily: "montserrat-semibold" }}>Confirm</Text>
                    </Button>

                </View>
            </View>
        </ScrollView>
    )
}

export default Upload

const styles = StyleSheet.create({})