import * as React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import axios from "axios";
import { Card, Text } from 'react-native-paper';
import { router } from 'expo-router';

import { ButtonComponent } from "../button/index.jsx";

import { getData } from "../../../api/manipulateData.js";
import { getItem, setItem, removeItem } from "../../../utils/data.js";
import { secure_base_url, backdrop_sizes } from "../../constants/configs.json";
import Colors from "../../constants/colors.js";
import { EXPO_TMDB_API_TOKEN } from "../../../env.json";

const MovieCard = (props) => {
  const [movie, setMovie] = React.useState(props.data);
  const [url, setUrl] = React.useState("");
  const head = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + EXPO_TMDB_API_TOKEN,
    },
  };

  const getUrl = async () => {
    setUrl(
      secure_base_url +
      backdrop_sizes[backdrop_sizes.length - 1] +
      movie.backdrop_path
    )

    const responseDetails = await getData(`https://api.themoviedb.org/3/movie/${movie.id}?language=pt-BR`, head);
    movie["searchedDetails"] = responseDetails.data;

    const responseSimilars = await getData(`https://api.themoviedb.org/3/movie/${movie.id}/similar?language=pt-BR&page=1`, head);
    movie["searchedSimilars"] = responseSimilars.data;
  }

  const openDetails = async () => {
    props.data["searchedImg"] = url;
    await setItem("@movie", props.data);
    router.replace("/details")
  };

  const removeMovie = async () => {
    await removeItem("@movie");
  };

  React.useEffect(() => {
    removeMovie();
  }, []);

  React.useEffect(() => {
    setMovie(props.data);
  }, [props.data]);

  React.useEffect(() => {
    getUrl();
  }, [movie]);

  return <>
    <Card style={[styles.cardContainer, { ...props.styleContainer }]}>
      <Card.Cover source={{ uri: url }} style={[styles.cardCover, { ...props.styleCover }]} />
      <Card.Content style={[styles.cardContent, { ...props.styleContent }]}>
        <Text variant="titleLarge" style={[{ ...props.styleTitle }]}>{movie.title}</Text>
        <Text variant="bodyMedium" style={[{ ...props.styleRating }]}>{movie.vote_average.toFixed(2)}</Text>
        {
          props.showDescription && 
          <View style={styles.containerOverview}>
            <Text variant="bodyMedium" style={{ ...props.styleOverview }}>{movie.overview}</Text>
          </View>
        }
      </Card.Content>
      <Card.Actions style={[styles.cardActions, { ...props.styleAction }]}>
        <ButtonComponent mode="contained" onPress={openDetails} style={{ backgroundColor: Colors().GoldenSunrise }}><Text>Detalhes</Text></ButtonComponent>
      </Card.Actions>
    </Card>
  </>
}

const styles = StyleSheet.create({
  cardContainer: {
    minWidth: Dimensions.get('window').width <= 600 ? Dimensions.get('window').width : Dimensions.get('window').width / 1.5,
    width: Dimensions.get('window').width <= 600 ? Dimensions.get('window').width : Dimensions.get('window').width / 1.5,
    height: "fit-content",
    borderRadius: 0,
  },
  cardCover: {
    height: Dimensions.get('window').width <= 1024 ? Dimensions.get('window').height / 4 : Dimensions.get('window').height / 3,
    borderRadius: 0,
  },
  cardContent: {
    padding: 20,
  },
  cardActions: {
    padding: 20,
  },
  containerOverview: {
    maxWidth: "70%",
    overflow: "hidden",
    marginTop: 10,
  },
});

export default MovieCard;