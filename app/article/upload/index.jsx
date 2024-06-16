import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react'
import { Input, TextArea, Button } from "native-base";
import { router } from "expo-router";
import im from "../../../assets/image_icon.png";

const Upload = () => {

    const [coverPic, setCoverPic] = useState("");



    const getPicture = async () => {
        const res = await DocumentPicker.getDocumentAsync({
            type: "image/*",
            copyToCacheDirectory: true
        });

        if (res?.canceled == false) {
            console.log(res?.assets[0]);
            // console.log();
            console.log(res?.assets[0]?.uri);
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
                        Publish Blog
                    </Text>


                    {/* Image */}

                    <TouchableOpacity onPress={getPicture} className="w-full mt-4 aspect-[3/2] flex justify-center items-center" style={{ backgroundColor: "#C3D8B3" }}>
                        <View className="w-20 h-20">
                            <Image className="w-full h-full" source={
                                coverPic ? {
                                    uri: coverPic?.uri
                                } : require("../../../assets/image_icon.png")
                            } />
                        </View>
                        <Text className=" mt-2" style={{ fontFamily: "montserrat-semibold" }}>Select Image to Upload</Text>
                    </TouchableOpacity>


                    <Input size="md" marginY={4} placeholder="Title" />
                    <Input size="md" marginY={4} placeholder="Reading time" />
                    <TextArea h={40} placeholder="Text Area Placeholder" fontSize={"sm"} />

                    <Button bgColor={"#C3D8B3"} marginTop={4}>
                        <Text style={{ fontFamily: "montserrat-semibold" }}>Submit</Text>
                    </Button>

                </View>
            </View>
        </ScrollView>
    )
}

export default Upload

const styles = StyleSheet.create({})