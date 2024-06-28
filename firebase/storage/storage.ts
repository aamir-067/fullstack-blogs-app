import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase.config";
import { CoverImage } from "../../app/article/upload";

export const uploadFile = async (file: CoverImage) => {
	try {
		const fileRef = ref(storage, file.fileName);
		const response = await fetch(file.uri);
		const fileBlob = await response.blob();

		await uploadBytes(fileRef, fileBlob, { contentType: file.type });
		const url = await getDownloadURL(fileRef);

		return url;
	} catch (error) {
		throw new Error("Error Uploading File");
		return "";
	}
};
