import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeString = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        return true;
    } catch (e) {
        return false;
    }
};

export const storeJson = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        return true;
    } catch (e) {
        // saving error
        return false;
    }
};
export const getString = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
        return null;
    } catch (e) {
        // error reading value
        return false;
    }
};

export const getJson = async (key) => {
    console.log(key);
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        return false;
    }
};

