import axios from "axios";
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { EXPO_TMDB_API_KEY, EXPO_TMDB_API_TOKEN } from "../../env.json";
import { useSession } from "../../context";
import { useEffect, useState } from "react";
import MovieCard from "../../src/components/moviecard";
import Body from "../../src/components/body";
import FlatList from "../../src/components/flatList/flatList";
import { Image } from "react-native";
import Colors from "../../src/constants/colors";

const Profile = () => {
    const config = {
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + EXPO_TMDB_API_TOKEN,
        },
    };

    const styles = StyleSheet.create({
        title: {
            marginTop: 20,
            marginLeft: 40,
            fontSize: 25,
            fontWeight: "bold",
        },
        containerProfile: {
            width: "100%",
            backgroundColor: "#d3685e",
            marginBottom: 20,
            padding: 10,
        },
        profilePicture: {
            width: 150,
            height: 150,
            borderRadius: "100%",
            alignSelf: "center",
        },
        profileName: {
            fontWeight: "bold",
            fontSize: 25,
            textAlign: "center",
            width: "100%",
            color: "white", 
        }
    });

    const { session } = useSession();
    const [url, setUrl] = useState("");
    const [userName, setUserName] = useState("");
    const [accountId, setAccountId] = useState(null);
    const [pagina, setPagina] = useState(1);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const getAccountData = async () => {
        await axios.get(`https://api.themoviedb.org/3/account?api_key=${EXPO_TMDB_API_KEY}&session_id=${session}`)
            .then((response) => {
                setUrl(response.data.avatar.tmdb.avatar_path === null ? "https://ui-avatars.com/api/?background=" + Colors().GoldenSunrise.replace("#", "") + "&color=fff&name=" + response.data.username
                    : response.data.avatar.tmdb.avatar_path);
                setUserName(response.data.username);
                setAccountId(response.data.id);
            });
    };

    const getDetailsAccount = async () => {
        const url = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?language=pt-BR&page=1&sort_by=created_at.asc`;
        await axios.get(url, config)
            .then((response) => {
                setFavoriteMovies(response.data.results);
            });
    };

    const handlePaginateFavorite = async (pagina, setPagina, setData, data) => {
        const url = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?language=pt-BR&page=${pagina}&sort_by=created_at.asc`;
        await axios.get(url, config)
            .then((response) => {
                setData([...data, ...response.data.results]);
            });
        setPagina(pagina)
    };

    const renderItem = (item) => {
        return <MovieCard
            key={item.id + item.original_title}
            data={item}
            styleContainer={{
                alignSelf: "center",
                width: "75%",
            }}
        />
    };
    const getKey = (item) => {
        return item.id + item.original_title;
    };

    useEffect(() => {
        getAccountData();
    }, [])

    useEffect(() => {
        if (accountId !== null) {
            getDetailsAccount();
        }
    }, [accountId])

    return <>
        <Body>
            <View style={styles.containerProfile}>
                <Image 
                    style={styles.profilePicture}
                    source={{ uri: url }}
                />
                <Text
                    style={styles.profileName}
                >
                    {userName}
                </Text>
            </View>
            <Text
                style={styles.title}
            >Favoritos: </Text>
            <FlatList
                style={{
                    marginTop: 20
                }}
                data={favoriteMovies}
                extraData={0}
                onEndReached={() => handlePaginateFavorite(pagina + 1, setPagina, setFavoriteMovies, favoriteMovies)}
                onEndReachedThreshold={0}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item) => getKey(item)}
            />
        </Body>
    </>
};

export default Profile;