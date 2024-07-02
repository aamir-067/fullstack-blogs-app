import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Input, Skeleton } from 'native-base'
import * as DocumentPicker from 'expo-document-picker';
import { useSelector } from 'react-redux'
import { State } from './index';
import { CoverImage } from '../article/upload';
import { editUserProfileDetails } from '../../firebase/firestore/user.controllers';
import { router } from 'expo-router';
interface userDetails {
    id: string,
    name: string,
    image?: string,
    email: string
    avatar?: string
}

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [coverPic, setCoverPic] = useState<CoverImage>(undefined);
    const [details, setDetails] = useState(undefined);
    const userDetails: userDetails = useSelector((state: State) => state.userDetails);


    useEffect(() => {
        setDetails({
            id: userDetails.id,
            name: userDetails.name,
            avatar: userDetails.avatar,
            email: userDetails.email,
            newPassword: "",
            confirmPassword: ""
        });

    }, []);

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
        setDetails((prev: any) => { return { ...prev, [key]: val } })
    }


    const updateUserDetails = async () => {
        try {
            // check if the details are empty or not.
            if (!(details?.name && (details.newPassword === details.confirmPassword))) {
                Alert.alert("Error", "Some fields are missing or wrong filled");

            }

            const res = await editUserProfileDetails({
                userId: details.id,
                name: details.name,
                email: details.email,
                password: details.newPassword,
                avatar: coverPic,
                prevAvatarUrl: details.avatar
            });

            if (res) {
                Alert.prompt("Successful", "Account details updated.");
                // router.navigate("/profile");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong while updating Profile");
            console.log("Error ", error);

        }
    }



    return (
        <View className="min-h-screen relative pb-14">
            {/* header container */}
            <View className="w-full h-full flex items-center">
                <View className="aspect-square z-10 w-full absolute -top-1/4" style={styles.headerContainer}>
                </View>
            </View>

            {/* content */}

            <View className="px-2 z-10 w-full h-full absolute mt-2">
                {
                    (loading || !details) ? (
                        (
                            <View className="w-full flex flex-col gap-y-6 items-center">

                                <View className="p-0 mb-24"></View>
                                <Skeleton borderWidth={1} borderColor="coolGray.200" endColor="warmGray.50" size="32" rounded="full" marginBottom={"-3"} />

                                <View className="w-full flex justify-center items-center flex-col gap-y-6">
                                    <Skeleton w="sm" h={"12"} rounded="10" />
                                    <Skeleton w="sm" h={"12"} rounded="10" />
                                    <Skeleton w="sm" h={"12"} rounded="10" />
                                    <Skeleton w="sm" h={"12"} rounded="10" />
                                </View>
                            </View>
                        )
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* nav btns */}
                            <View className="flex flex-row justify-center">
                                <Text className="text-lg capitalize" style={{ fontFamily: "rufina-bold" }}>Edit Profile</Text>
                            </View>

                            <View>
                                {/* avatar */}
                                <View className="h-30 mt-16 flex items-center">
                                    <View className=" border-4 border-white w-28 aspect-square rounded-full overflow-hidden">
                                        <Image className="w-full h-full bg-gray-700" source={{ uri: coverPic ? coverPic.uri : details?.avatar }} />
                                        <TouchableOpacity onPress={getPicture} className="absolute bottom-0 w-full h-1/3 bg-black/70">
                                            <Text className="text-center text-white font-bold pt-1">edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>


                                <View className="mt-10">
                                    <Input size="md" onChangeText={(e) => setText("name", e)} marginY={2} placeholder="Title" value={details?.name} />
                                    <Input size="md" marginY={2} readOnly={true} placeholder="Reading time" value={details?.email} />
                                    <Input size="md" onChangeText={(e) => setText("newPassword", e)} marginY={2} placeholder="new password" value={details?.newPassword} />
                                    <Input size="md" onChangeText={(e) => setText("confirmPassword", e)} marginY={2} placeholder="confirm new password" value={details?.confirmPassword} />
                                </View>

                                <Button onPress={updateUserDetails} className="w-5/12 mx-auto mt-3" style={{ backgroundColor: "#C3D8B3" }}>
                                    <Text className="font-bold text-base text-black">Confirm Edit</Text>
                                </Button>

                            </View>

                        </ScrollView>
                    )
                }
            </View >
        </View >

    )
}

export default Profile

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#C3D8B3",
        width: "100%",
        borderRadius: 200,
        transform: [{ scaleX: 1.4 }],
    }
})