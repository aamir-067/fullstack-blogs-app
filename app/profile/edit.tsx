import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from "expo-router";
const edit = () => {
    return (
        <View>
            <Link href={"/"}>Home</Link>
            <Text>edit</Text>
        </View>
    )
}

export default edit

const styles = StyleSheet.create({})