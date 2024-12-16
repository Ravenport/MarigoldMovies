import { Stack, Redirect } from "expo-router";
import { useSession } from "../../context";
import { Text } from "react-native";
import { router } from "expo-router";

const Logged = () => {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!session) {
        router.replace({ pathname: `/` })
    }

    return <Stack>
        <Stack.Screen
            name="index"
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="details"
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="profile"
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="scanner"
            options={{ title: "QR Code Scanner" }}
        />
        <Stack.Screen
            name="search"
            options={{
                headerShown: false,
            }}
        />
    </Stack>
};

export default Logged;