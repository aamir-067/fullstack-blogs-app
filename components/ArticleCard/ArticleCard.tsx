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

                        <Text className="text-2xl" style={{ fontFamily: "rufina-bold" }}>{blog.title ? blog.title : "Heading of article"}</Text>
                        <Text className="max-w-[150px] text-gray-400 text-sm pt-1 whitespace-nowrap">{blog?.content && (blog.content.length > 30 ? blog.content.substring(0, 30) : blog.content) + "..."}</Text>
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