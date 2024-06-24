import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import React from "react";
import { Link, router } from "expo-router";

const ArticlePreview = () => {

	const { blogId } = useLocalSearchParams();


	//TODO: fetch the results opf the blog whose id is blogId and update the result in UI


	console.log("Blog Id which you visited : ", blogId);

	return (
		<ScrollView>
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
							uri: "https://www.geosuper.tv/assets/uploads/updates/2022-11-20/20187_400599_updates.jpg",
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
						How the Politicle parties effect the price of BTC.
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
								Jack Richer
							</Text>
						</View>
						<Text
							className="text-sm"
							style={{ fontFamily: "montserrat-light" }}
						>
							14 MAR 2024
						</Text>
					</View>
					{/* line */}
					<View className="w-full border-b-2 mt-2 border-gray-200"></View>

					<Text
						className="mt-8 text-sm"
						style={{ fontFamily: "montserrat-regular" }}
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
						provident. Omnis ratione laboriosam similique veniam.
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};

export default ArticlePreview;

const styles = StyleSheet.create({});
