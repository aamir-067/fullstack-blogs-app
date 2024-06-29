import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import { getBlog, getOwnerOfBlog } from "../../../firebase/firestore/blog.controller";
import { Skeleton } from "native-base";
import { Blog } from "../../../features/blogsDetails.reducer";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";
import { useSelector } from "react-redux";
import { State } from "../../profile";
const ArticlePreview = () => {
	const [blog, setBlog] = useState(undefined);
	const [ownerDetails, setOwnerDetails] = useState(undefined);
	const { blogId } = useLocalSearchParams();
	const [isOwner, setIsOwner] = useState(true);
	const currentUserEmail = useSelector((state: State) => state.userDetails.email)

	useEffect(() => {
		(async () => {
			const result = await getBlog(blogId);
			const owner = await getOwnerOfBlog(blogId);
			setOwnerDetails(owner);
			setBlog(result);
			setIsOwner(owner.email === currentUserEmail);

		})()
	}, [])

	return (
		<ScrollView>
			{
				!blog ?
					<View className="min-h-full b-20 flex gap-y-8 flex-col">
						<Skeleton h="72" />
						<Skeleton px="2" my="0" rounded="md" />
						<Skeleton.Text lines={5} px="2" />
					</View> :

					<View className=" min-h-screen mb-48">

						<View
							className="h-2/6 relative overflow-hidden"
							style={{
								borderBottomLeftRadius: 15,
								borderBottomRightRadius: 15,
							}}
						>
							{/* nav buttons */}
							{
								isOwner && (
									<View className="absolute top-0 right-0 p-2 z-20">
										<View onTouchEnd={() => router.navigate(`/article/edit/${blogId}`)} className="h-6 w-16 bg-white rounded-sm flex flex-row justify-evenly items-center">
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
									</View>
								)
							}
							<Image
								className="w-full h-full"
								source={{
									uri: blog?.image ? blog.image : "https://www.geosuper.tv/assets/uploads/updates/2022-11-20/20187_400599_updates.jpg",
								}}
							/>

						</View>

						{/* below picture area */}
						<View className="mx-2">
							{/* title */}
							<Text
								className="text-2xl mt-10"
								style={{ fontFamily: "rufina-bold" }}
							>
								{blog?.title ? blog.title : "How the Politicle parties effect the price of BTC."}
							</Text>

							{/* author and date */}
							<View className="w-full flex flex-row justify-between items-center mt-6">
								<View className="flex flex-row">
									<Text
										className="text-sm"
										style={{ fontFamily: "montserrat-light" }}
									>
										written by
									</Text>
									<Text
										className="text-sm"
										style={{ fontFamily: "montserrat-bold" }}
									>
										{" "}
										{ownerDetails ? ownerDetails.name : "Jake Reacher"}
									</Text>
								</View>
								<Text
									className="text-sm"
									style={{ fontFamily: "montserrat-light" }}
								>
									{ownerDetails ? ownerDetails.uploadTime : "28 AUG 2024"}
								</Text>
							</View>
							{/* line */}
							<View className="w-full border-b-2 mt-2 border-gray-200"></View>

							<Text
								className="mt-8 text-sm"
								style={{ fontFamily: "montserrat-regular" }}
							>
								{blog?.content ? blog.content : ``}
							</Text>
						</View>
					</View>
			}
		</ScrollView>
	);
};

export default ArticlePreview;

const styles = StyleSheet.create({});
