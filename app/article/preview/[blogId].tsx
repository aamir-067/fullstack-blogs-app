import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { getBlog, getOwnerOfBlog } from "../../../firebase/firestore/blog.controller";
import { Skeleton, Center, VStack } from "native-base";
const ArticlePreview = () => {
	const [blog, setBlog] = useState(undefined);
	const [ownerDetails, setOwnerDetails] = useState(undefined);
	const { blogId } = useLocalSearchParams();

	useEffect(() => {
		(async () => {
			const result = await getBlog(blogId);
			const owner = await getOwnerOfBlog(blogId);
			setOwnerDetails(owner)
			setBlog(result)

		})()
	}, [])



	return (
		<ScrollView>
			{
				!blog ?
					<View className="min-h-full flex gap-y-8 flex-col">
						<Skeleton h="72" />
						<Skeleton px="2" my="0" rounded="md" />
						<Skeleton.Text lines={5} px="2" />
					</View> :
					<View className="min-h-screen">
						<View
							className="h-2/6 relative overflow-hidden"
							style={{
								borderBottomLeftRadius: 15,
								borderBottomRightRadius: 15,
							}}
						>
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
								{blog?.content ? blog.content : `Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Maiores delectus provident suscipit architecto molestiae
						deserunt in? Earum, itaque. Nostrum amet quo voluptas
						eligendi aspernatur deleniti officia, nulla veritatis
						libero quaerat! Nulla iusto et porro minima omnis quas
						eaque autem, accusamus natus ipsum facilis earum veniam
						necessitatibus incidunt illum temporibus explicabo magni
						tenetur quis non. Officiis dolorum provident quae quasi
						autem? Dicta aperiam cum, numquam et quod aspernatur
						illum fugit sequi debitis porro modi impedit soluta sunt
						ex minus officia iure dignissimos tenetur autem ipsam
						ratione ipsum laboriosam! Saepe, numquam. Enim explicabo
						eveniet fugit ipsum fuga totam, atque molestiae
						voluptatibus eligendi!. Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Quisquam fugit ad cum
						ipsum. Quasi reprehenderit voluptates non architecto
						aperiam facilis. Enim possimus reiciendis aliquid
						provident. Omnis ratione laboriosam similique veniam.`}
							</Text>
						</View>
					</View>
			}
		</ScrollView>
	);
};

export default ArticlePreview;

const styles = StyleSheet.create({});
