import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { Button } from 'native-base'
import ArticleCard from '../../components/ArticleCard/ArticleCard'
import { getJson } from "../../utils/asyncStorage.js"



const Profile = () => {
    const [useDetails, setUserDetails] = useState(undefined);


    useEffect(() => {
        (async () => {
            const useData = await getJson("userDetails");
            if (useData) {
                console.log("user is Logged in");
                console.log(useData);
                setUserDetails(useData);
            }
        })()
    }, []);
    return (
        <View className="min-h-screen relative">

            {/* header container */}
            <View className="w-full h-full flex items-center">
                <View className="aspect-square z-10 w-full absolute -top-1/4" style={styles.headerContainer}>
                </View>
            </View>

            {/* content */}
            <View className="px-2 z-10 w-full h-full absolute">
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* nav btns */}
                    <View className="flex flex-row justify-between mt-10">
                        <View onTouchEnd={() => router.navigate("/")} className="h-6 w-16 flex flex-row justify-evenly items-center">
                            <Image
                                className="w-4 aspect-square"
                                source={{
                                    uri: "https://static.thenounproject.com/png/517807-200.png",
                                }}
                            />
                            <Text className="text-base" style={{ fontFamily: "montserrat-semibold" }}>
                                Back
                            </Text>
                        </View>
                        <Text className="text-base" style={{ fontFamily: "montserrat-semibold" }}>
                            Edit
                        </Text>
                    </View>

                    {/* if logged in */}
                    {
                        useDetails ? <View>
                            {/* avatar */}
                            <View className="h-30 mt-16 flex items-center">
                                <View className=" border-4 border-white w-28 aspect-square rounded-full overflow-hidden">
                                    <Image className="w-full h-full" source={{ uri: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg" }} />
                                </View>
                            </View>

                            {/* name and mail */}
                            <View className="mt-2 flex items-center">
                                <Text className="text-base" style={{ fontFamily: "montserrat-semibold" }}>Jack Richer</Text>
                                <Text className="text-xs" style={{ fontFamily: "montserrat-regular" }}>jack.richer067@gmail.com</Text>
                            </View>

                            {/* uploaded articles */}
                            <Text className="mt-10" style={{ fontFamily: "rufina-regular", fontSize: 24 }}>
                                Uploaded Blogs
                            </Text>

                            {/* line */}
                            <View className="w-full border-b-2 mt-2 mb-10 border-gray-200"></View>


                            {/* Articles */}
                            <View className="flex">
                                <View className="mb-4">
                                    <ArticleCard />
                                </View>
                                <View className="mb-4">
                                    <ArticleCard />
                                </View>
                                <View className="mb-4">
                                    <ArticleCard />
                                </View>
                                <View className="mb-4">
                                    <ArticleCard />
                                </View>
                                <View className="mb-4">
                                    <ArticleCard />
                                </View>
                            </View>
                        </View> :
                            // when its logged out
                            <View View className="mt-60">
                                <Text className="text-center text-lg mb-5" style={{ fontFamily: "montserrat-bold" }}>Don't have an account ?</Text>

                                <Button bgColor={"#C3D8B3"}>
                                    <Link href={"/user/register"}>
                                        <Text className="text-center text-lg" style={{ fontFamily: "montserrat-bold" }}>Get Started</Text>
                                    </Link>
                                </Button>
                            </View>
                    }


                </ScrollView>
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