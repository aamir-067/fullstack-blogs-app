import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ArticleCard = ({ blog, owner } = { blog: {}, owner: {} }) => {




    return (
        <View>
            <View className="h-[72px] w-full flex flex-row justify-between">
                <Image className="aspect-square rounded-lg" source={{ uri: blog.image ? blog.image : "https://images.unsplash.com/photo-1561889758-ab68199043d9?q=80&w=3267&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} />
                {/* // content */}

                <View className=" flex flex-row justify-between w-9/12 items-center">

                    <View className="flex">
                        <View className="flex flex-row gap-2 items-center">
                            <Image className="w-6 h-6 rounded-full" source={{ uri: owner.avatar ? owner.avatar : "https://plus.unsplash.com/premium_photo-1681492405224-b787ee736768?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} />
                            <Text className="text-sm" style={{ fontFamily: "montserrat-regular" }}>{owner.name ? owner.name : "Nicolas johns."}</Text>
                        </View>
                        <Text className="text-2xl" style={{ fontFamily: "rufina-bold" }}>{blog.title ? blog.title : "Heading of article"}</Text>
                    </View>


                    <View className=" w-3/12 flex items-center justify-center -mt-4  border-2 rounded-full" style={{ borderColor: "#C3D8B3" }}>
                        <Text className="text-xs p-2" style={{ fontFamily: "montserrat-regular", color: "#C3D8B3" }}>{blog.time ? blog.time + " min" : "5 min"}</Text>
                    </View>


                </View>
            </View>

            {/* line */}
            <View className="w-full border-b-2 mt-2 border-gray-200"></View>
        </View>
    )
}

export default ArticleCard

const styles = StyleSheet.create({})