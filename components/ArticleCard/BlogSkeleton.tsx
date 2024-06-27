import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Skeleton } from 'native-base'

const BlogSkeleton = () => {
    return (
        <View>
            <View className="h-[72px] w-full flex flex-row justify-evenly">
                <Skeleton w={"16"} h={"full"} rounded={"lg"} />
                {/* // content */}
                <View className="flex flex-row justify-between w-9/12 items-center">

                    <View className="flex pl-2 w-9/12 gap-y-2">
                        <Skeleton h={"6"} rounded={"full"} w={"2/3"} />
                        <Skeleton.Text lines={1} w={"full"} paddingRight={"4"} />
                    </View>
                    {/* <View className=" w-3/12 flex items-center justify-center -mt-4  border-2 rounded-full" style={{ borderColor: "#C3D8B3" }}> */}
                    {/* <Text className="text-xs p-2" style={{ fontFamily: "montserrat-regular", color: "#C3D8B3" }}>{blog.time ? blog.time + " min" : "5 min"}</Text> */}
                    <Skeleton w={"1/4"} h={"1/2"} rounded={"full"} alignItems={"center"} />
                </View>
            </View>
        </View>
    )
}

export default BlogSkeleton