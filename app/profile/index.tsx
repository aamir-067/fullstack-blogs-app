import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { Button, Center, VStack, Skeleton, HStack } from 'native-base'
import ArticleCard from '../../components/ArticleCard/ArticleCard'
import { getString, storeString } from "../../utils/asyncStorage"
import { signOutUser } from '../../firebase/auth'
import { getUserByEmail, getUserUploadedBlogs } from '../../firebase/firestore/user.controllers'
import { useSelector } from 'react-redux'
import { BlogsDetails } from "../../features/blogsDetails.reducer"
import BlogSkeleton from '../../components/ArticleCard/BlogSkeleton'
interface userDetails {
    id: string,
    name: string,
    image: string,
    password: string,
    email: string
}

export interface State {
    userDetails: userDetails
    blogsDetails: BlogsDetails
}

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const userDetails = useSelector((state: State) => state.userDetails);
    const userBlogs = useSelector((state: State) => state.blogsDetails.userBlogs);

    useEffect(() => {
        (async () => {
            const userEmail = await getString("userDetails");

            if (userEmail && userDetails?.id.length == 0) {
                setLoading(true);
                try {
                    await getUserByEmail(userEmail);
                } catch (error) {
                    console.log("error in fetching the user profile results.", error);
                }
            }
            setLoading(false);
            await getUserUploadedBlogs();
        })()
    }, []);



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
                    loading ? (
                        (

                            <View className="w-full flex flex-col gap-y-6 items-center">

                                <View className="p-0 mb-24"></View>
                                <Skeleton borderWidth={1} borderColor="coolGray.200" endColor="warmGray.50" size="32" rounded="full" marginBottom={"-3"} />

                                <View className="flex flex-col gap-2 items-center">
                                    <Skeleton h={"5"} w={"24"} rounded={"md"} />
                                    <Skeleton h={"3"} w={"40"} rounded={"md"} />
                                </View>


                                <View className="w-full">
                                    <Skeleton w="40" rounded="10" />
                                </View>

                                {/* <Skeleton.Text lines={5} /> */}
                                <VStack space={"2"}>
                                    <BlogSkeleton />
                                    <BlogSkeleton />
                                </VStack>
                            </View>
                        )
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* nav btns */}
                            <View className="flex flex-row justify-between">
                                {
                                    userDetails?.id && (
                                        <View onTouchEnd={() => router.navigate("/profile/edit")} className="h-6 w-16 flex flex-row justify-evenly items-center">
                                            <Image
                                                className="w-4 mt-1 aspect-square"
                                                source={{
                                                    uri: "https://static-00.iconduck.com/assets.00/edit-icon-2048x2048-6svwfwto.png",
                                                }}
                                            />
                                            <Text className="text-base" style={{ fontFamily: "montserrat-semibold" }}>
                                                Edit
                                            </Text>
                                        </View>
                                    )
                                }
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
                                            userBlogs.details.map((blog, index) => {
                                                return (
                                                    <Pressable key={index}>
                                                        <ArticleCard blog={blog} id={userBlogs.ids[index]} className={"mb-4"} />
                                                    </Pressable>
                                                )
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