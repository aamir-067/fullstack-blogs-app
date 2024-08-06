import { Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
import React, { useEffect, useState } from 'react'
import { Input, TextArea, Button, Skeleton } from "native-base";
import { router, useLocalSearchParams } from "expo-router";
import { BlogText, CoverImage } from '../upload';
import { getBlog, updateBlog } from '../../../firebase/firestore/blog.controller';
const Upload = () => {

    const [blog, setBlog] = useState(undefined);
    const { blogId } = useLocalSearchParams();
    const [coverPic, setCoverPic] = useState<CoverImage>(undefined);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<BlogText>(undefined);
    useEffect(() => {
        (async () => {
            const result = await getBlog(blogId);
            setBlog(result);
            setDetails({
                title: result.title,
                time: result.time,
                content: result.content
            })
        })()
    }, [])

    const getPicture = async () => {
        const res = await DocumentPicker.getDocumentAsync({
            type: "image/*",
            copyToCacheDirectory: true
        });

        if (res?.canceled == false) {
            setCoverPic({ uri: res?.assets[0].uri, type: res?.assets[0].mimeType, fileName: res?.assets[0].name });
        }
    }


    const setText = (key: string, val: string) => {
        setDetails((prev: BlogText) => { return { ...prev, [key]: val } })
    }



    const updateBlogDetails = async () => {
        try {
            if ((details?.content.length == 0) || (details?.time.length == 0) || (details?.title.length == 0)) {
                Alert.alert("Error", "Some Fields are missing.");
                return;
            }

            setLoading(true);
            const res = await updateBlog({ ...details, blogId, image: coverPic, prevImageUrl: blog.image });
            setLoading(false);
            if (res) {
                Alert.alert("Update Successful", "Blog updated successfully!");
            }
            router.navigate(`/article/preview/${blogId}`);
        } catch (error) {
            Alert.alert("Error", "Something went wrong while updating the blog");
            throw new Error("Something went wrong while updating the blog details");
        }
    }

    return (

        <ScrollView showsVerticalScrollIndicator={false}>
            <View className="min-h-screen">

                {/* content */}
                {
                    (!(blog && details) || isLoading) ? (
                        <View className="mx-2">
                            {/* title */}
                            <Skeleton className="text-2xl mt-2 w-36 mx-auto" />

                            {/* Image */}
                            <Skeleton className="w-full mt-4 h-2/6" />

                            <Skeleton marginY={4} />
                            <Skeleton marginY={4} />
                            <Skeleton.Text marginY={4} lines={5} />

                            <Skeleton className="mx-auto w-24" />

                        </View>
                    ) : (
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
                                <Image className="w-full h-full object-cover" source={{ uri: coverPic ? coverPic.uri : blog?.image }} />
                            </TouchableOpacity>

                            <Input onChangeText={(e) => setText("title", e)} size="md" marginY={4} placeholder="Title" value={details.title} />
                            <Input onChangeText={(e) => setText("time", e)} size="md" marginY={4} placeholder="Reading time" value={details.time} />
                            <TextArea onChangeText={(e) => setText("content", e)} autoCompleteType={"none"} h={40} placeholder="Text Area Placeholder" fontSize={"sm"} value={details.content} />

                            <Button onPress={updateBlogDetails} bgColor={"#C3D8B3"} marginTop={4}>
                                <Text style={{ fontFamily: "montserrat-semibold" }}>Confirm</Text>
                            </Button>

                        </View>
                    )
                }
            </View>
        </ScrollView>
    )
}

export default Upload