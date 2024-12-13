import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        return { data: {}, status: true };
    } catch (e) {
        console.error(e);
        return { data: {}, status: false };
    }
}

const getItem = async (key) => {
    try {
        const response = await AsyncStorage.getItem(key);
        if (response !== null) {
            return { data: JSON.parse(response), status: true };
        } else {
            return { data: {}, status: false };
        }
    } catch (e) {
        console.error(e);
        return { data: {}, status: false };
    }
}

const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return { data: {}, status: true };
    } catch (e) {
        console.error(e);
        return { data: {}, status: false };
    }
}

export {setItem, getItem, removeItem}