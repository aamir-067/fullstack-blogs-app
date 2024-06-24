import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { Button } from 'native-base'
import ArticleCard from '../../components/ArticleCard/ArticleCard'
import { getString, storeString } from "../../utils/asyncStorage"
import { signOutUser } from '../../firebase/auth'
import { getUserByEmail, getUserUploadedBlogs } from '../../firebase/firestore/user.controllers'
import { store } from '../../store/store'
import { setUserDetails as setUsersDetails } from "../../features/userDetails.reducer";


interface userDetails {
    uid: string,
    name: string,
    image: string,
    password: string,
    email: string
}
const Profile = () => {
    const [userDetails, setUserDetails] = useState(undefined);
    const [userUploadedBlogs, setUserUploadedBlogs] = useState([[], []]);



    useEffect(() => {
        (async () => {
            const s = store.getState().userDetails;
            setUserDetails(s);
            console.log(userDetails?.id);

            if (userDetails?.id.length == 0) {
                const userEmail = await getString("userDetails");
                console.log(userEmail);

                if (userEmail) {
                    // fetch the latest data and then store it in localStorage and update it in UI.
                    try {
                        const user = await getUserByEmail(userEmail);
                        setUserDetails(user)
                        // const [allBlogs, blogsIndexes] = await getUserUploadedBlogs();
                        // setUserUploadedBlogs([allBlogs, blogsIndexes]);
                    } catch (error) {
                        console.log("error in fetching the user profile results.", error);
                    }
                }
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
                    <View className="flex flex-row justify-between">
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
                        {
                            userDetails?.id && <Pressable onPress={signOutUser}>
                                <Text className="text-base" style={{ fontFamily: "montserrat-semibold" }}>logout</Text>
                            </Pressable>
                        }
                    </View>

                    {/* if logged in */}
                    {
                        userDetails?.id ? <View>
                            {/* avatar */}
                            <View className="h-30 mt-16 flex items-center">
                                <View className=" border-4 border-white w-28 aspect-square rounded-full overflow-hidden">
                                    <Image className="w-full h-full bg-gray-700" source={{ uri: userDetails?.avatar }} />
                                </View>
                            </View>

                            {/* name and mail */}
                            <View className="mt-2 flex items-center">
                                <Text className="text-base" style={{ fontFamily: "montserrat-semibold" }}>{userDetails?.name}</Text>
                                <Text className="text-xs" style={{ fontFamily: "montserrat-regular" }}>{userDetails?.email}</Text>
                            </View>

                            {/* uploaded articles */}
                            <Text className="mt-10" style={{ fontFamily: "rufina-regular", fontSize: 24 }}>
                                Uploaded Blogs
                            </Text>

                            {/* line */}
                            <View className="w-full border-b-2 mt-2 mb-10 border-gray-200"></View>


                            {/* Articles */}
                            <View className="flex">
                                {
                                    userUploadedBlogs[0].map((blog, index) => {
                                        return <View onTouchEnd={() => router.navigate(`/article/preview/${userUploadedBlogs[1][index]}`)} key={index} className="mb-4">

                                            <ArticleCard blog={blog} owner={userDetails} />

                                        </View>
                                    })
                                }

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