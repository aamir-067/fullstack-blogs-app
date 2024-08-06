import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react'
import { Input, TextArea, Button } from "native-base";
import { useSelector } from 'react-redux';
import { State } from '../../profile';
import { uploadBlog } from '../../../firebase/firestore/blog.controller';
export interface CoverImage {
    type: string,
    uri: string
    fileName: string
}

export interface BlogText {
    title: string;
    time: string;
    content: string;
}
const Upload = () => {

    const [coverPic, setCoverPic] = useState<CoverImage>(undefined);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<BlogText>();


    const userDetails = useSelector((state: State) => state.userDetails);


    const getPicture = async () => {
        const res = await DocumentPicker.getDocumentAsync({
            type: "image/*",
            copyToCacheDirectory: true
        });
        if (res?.canceled == false) {
            const img = res?.assets[0];
            setCoverPic({
                type: img.mimeType,
                uri: img.uri,
                fileName: img.name
            })
        }
    }


    const setText = (key: string, val: string) => {
        setDetails((prev: BlogText) => { return { ...prev, [key]: val } })
    }

    const uploadTheBlog = async () => {
        try {
            if ((details?.content.length == 0) || (details?.time.length == 0) || (details?.title.length == 0) || (coverPic === undefined)) {
                Alert.alert("Error", "Some Fields are missing.");
                return;
            }

            // make sure the user is loggedIn.
            if (userDetails?.id.length == 0) {
                Alert.alert("Error", "Please login first.");
                return;
            }

            const response = await uploadBlog({ ...details, image: coverPic });
            if (response) {
                Alert.alert("Successful", "Blog Uploaded Successfully");
            }
        } catch (error) {
            Alert.alert("Error", "Unexpected error occurred while uploading the blog")
        }
    }







    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className="min-h-screen">


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
                        {
                            coverPic?.uri ? (
                                <Image className="w-full h-full object-contain" source={{ uri: coverPic.uri }} />
                            ) : (
                                <>
                                    <View className="w-20 h-20">
                                        <Image className="w-full h-full" source={
                                            coverPic?.uri ? {
                                                uri: coverPic?.uri
                                            } : require("../../../assets/image_icon.png")
                                        } />
                                    </View>
                                    <Text className=" mt-2" style={{ fontFamily: "montserrat-semibold" }}>Select Image to Upload</Text>
                                </>
                            )
                        }

                    </TouchableOpacity>


                    <Input onChangeText={(e) => setText("title", e)} size="md" marginY={4} placeholder="Title" />
                    <Input onChangeText={(e) => setText("time", e)} size="md" marginY={4} placeholder="Reading time" />
                    <TextArea onChangeText={(e) => setText("content", e)} autoCompleteType={"none"} h={40} placeholder="Text Area Placeholder" fontSize={"sm"} />
                    <Button bgColor={"#C3D8B3"} className="active:opacity-70" marginTop={4} onPress={uploadTheBlog}>
                        <Text style={{ fontFamily: "montserrat-semibold" }}>Submit</Text>
                    </Button>

                </View>
            </View>
        </ScrollView>
    )
}

export default Upload

const styles = StyleSheet.create({})