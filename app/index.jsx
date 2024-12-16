import { View, Text, StyleSheet, SafeAreaView, Dimensions, Linking } from "react-native";
import { useEffect } from "react";
import { CustomButton } from "../src/components/button/index";
import Colors from "../src/constants/colors";
import axios from "axios";
import { EXPO_TMDB_API_TOKEN, EXPO_TMDB_API_KEY } from "../env.json";
import { router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import {useSession} from "../context";

const Login = () => {
    const local = useLocalSearchParams();
    const {signIn, session} = useSession();
    
    const styles = StyleSheet.create({
        containerLogin: {
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
        },
        containerTitle: {
            backgroundColor: Colors().CheerFulmarigold,
            padding: 20,
            marginBottom: 20,
            borderRadius: 10,
            width: "50%",
        },
        title: {
            fontSize: 25,
            fontWeight: "bold",
            fontFamily: "arial",
            marginBottom: 5,
            color: "white",
            textAlign: "center",
        },
        subTitle: {
            fontSize: 16,
            fontFamily: "arial",
            color: "white",
            textAlign: "center",
        },
        btn: {
            backgroundColor: Colors().GoldenSunrise,
            padding: 5,
            marginBottom: 20,
            width: "50%",
        },
        btnTitle: {
            color: "white",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
        },
    });

    const handleLogin = async () => {
        const config = {
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + EXPO_TMDB_API_TOKEN,
            },
        };
        await axios.get('https://api.themoviedb.org/3/authentication/token/new', config).then((response) => {
            login(response.data.request_token);
        });
    };

    const login = async (token) => {
        let urlTemp;
        await Linking.getInitialURL().then((url) => {
            urlTemp = url;
        });
        Linking.openURL(`https://www.themoviedb.org/authenticate/${token}?redirect_to=${urlTemp}`);
    }

    const createSessionID = async (token) => {
        console.log(token);
        const config = {
            headers: {
                accept: "application/json",
            }
        };
        await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${EXPO_TMDB_API_KEY}&request_token=${token}`, config).then((response) => {
            signIn(response.data.session_id);
            router.replace({ pathname: `/logged/` })
        });
    }

    useEffect(() => {
        if(local.request_token) {
            createSessionID(local.request_token);
        }
    }, [])

    useEffect(() => {
        if(session) {
            router.replace({ pathname: `/logged/` })
        }
    }, [session])

    return <SafeAreaView style={styles.containerLogin}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Filmes Marigold</Text>
                <Text style={styles.subTitle}>Login using TMDB</Text>
            </View>
            <CustomButton onPress={handleLogin} style={styles.btn}><Text style={styles.btnTitle}>Entrar</Text></CustomButton>
    </SafeAreaView>
};

export default Login;