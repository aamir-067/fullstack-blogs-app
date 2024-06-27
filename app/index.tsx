import { ScrollView, StyleSheet, Text, View, Image, Pressable, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router';
import { Skeleton, VStack } from 'native-base';
import { getAllBlogs, getMainBlog } from '../firebase/firestore/blog.controller';
import { useSelector } from 'react-redux';
import { State } from './profile';
import BlogSkeleton from '../components/ArticleCard/BlogSkeleton';
const HomePage = () => {
    const topBlog = useSelector((state: State) => state.blogsDetails.topBlog);
    console.log("top blog is =====> ", topBlog);

    useEffect(() => {
        (async () => {
            //TODO: Fix this

            if (!topBlog.details) {
                await getMainBlog();
            }
            await getAllBlogs();
        })()
    }, []);





    return (
        <SafeAreaView className="mx-2 mt-4">
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text className="" style={styles.welcomeHeading}>Welcome, 👋</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 py-4">
                    <Text style={[styles.categoryBtn, styles.selectedCategoryBtn]}> Latest</Text>
                    <Text style={[styles.categoryBtn]}>Technology</Text>
                    <Text style={styles.categoryBtn}>Finance</Text>
                    <Text style={styles.categoryBtn}>Politics</Text>
                    <Text style={styles.categoryBtn}>Programming</Text>
                    <Text style={styles.categoryBtn}>Other</Text>
                </ScrollView>
                {/* line */}
                <View className="w-full border-b-2 border-gray-200"></View>


                {/* image and the top article */}
                {
                    topBlog?.details?.title.length ? (
                        <Pressable onPress={() => router.navigate(`/article/preview/${topBlog.details.id}`)}>
                            <View className="w-full aspect-[4/3] mt-6 relative bg-red-400">
                                <Image className="w-full h-full" source={{ uri: topBlog.details.image }} />

                                {/*Heading and the author of the top article  */}
                                <View className="absolute bottom-0 left-0 w-full h-20 px-2">
                                    <View className=" w-full rounded-md h-9 flex justify-center items-center" style={styles.blogHeading}>
                                        <Text className=" w-full text-left ml-2 text-lg" style={{ fontFamily: "montserrat-regular" }}>{topBlog.details.title}</Text>
                                    </View>
                                    <View className="flex flex-row justify-end mt-2 items-center">
                                        <View className="flex flex-row gap-2 items-center">
                                            <Text className="text-sm" style={{ fontFamily: "montserrat-light" }}>{topBlog.owner.name}</Text>
                                            <Image className="w-6 h-6 rounded-full" source={{ uri: topBlog.owner.image }} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    ) : (
                        <Skeleton w={"full"} mt={"6"} h={"56"} />
                    )
                }


                {/* Top articles */}
                <Text className=" my-4" style={{ fontFamily: "rufina-regular", fontSize: 28 }}>
                    Latest Blogs
                </Text>


                {/* Articles */}
                <View className="flex">
                    <View className="mb-4">
                    </View>
                    <View className="mb-4">
                        {/* <ArticleCard /> */}
                        <VStack space={"3"}>
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                        </VStack>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomePage

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        marginHorizontal: 8
    },
    welcomeHeading: {
        fontSize: 32,
        fontFamily: "rufina-bold"
    },
    catagories: {
        marginTop: 24
    },
    categoryBtn: {
        marginHorizontal: 16,
        fontFamily: "montserrat-regular",
        fontSize: 14,
        fontWeight: "600",
    },
    selectedCategoryBtn: {
        fontFamily: "montserrat-bold"
    },
    blogHeading: {
        backgroundColor: "#C3D8B3",

    }
})