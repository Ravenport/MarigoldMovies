import { Text, View, ScrollView, StyleSheet, ImageBackground, Dimensions, Image } from 'react-native';
import * as React from 'react';
import Fontisto from '@expo/vector-icons/Fontisto';

import { getData } from "../api/manipulateData.js";

import Body from '../src/components/body/index.jsx';
import CardCustom from '../src/components/card/index.jsx';
import MovieCard from "../src/components/moviecard/index.jsx";
import { EXPO_TMDB_API_TOKEN } from "../env.json";
import axios from 'axios';

const Details = (props) => {
  const styles = StyleSheet.create({
    containerView: {
      height: Dimensions.get("window").height,
    },
    dataMovie: {
      backgroundColor: "#2d2d2d",
      padding: 20,
    },
    containerCard: {
      position: "absolute",
      top: 40,
      zIndex: 1001,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      right: 0
    },
    imgBackground: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height / 1.8,
      justifyContent: "center",
    },
    backdropImg: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: Dimensions.get("window").height - Dimensions.get("window").height / 1.8,
      backgroundColor: "#2d1919",
      zIndex: 1000,
      opacity: 0.75,
    },
    titleMovie: {
      fontSize: 30,
      color: "white",
      fontWeight: "bold",
    },
    ratingMovie: {
      color: "white",
      fontWeight: "bold",
      marginRight: 5,
    },
    genresMovie: {
      color: "white",
      fontWeight: "bold",
      marginLeft: 10,
      marginTop: 10,
    },
    containerRating: {
      flexDirection: "row",
      alignItems: "start",
    },
    containerGenres: {
      flexDirection: "row",
      alignItems: "center",
    },
    titleSinopse: {
      color: "white",
      fontWeight: "bold",
      fontSize: 25
    },
    sinopse: {
      color: "white",
    },
    containerSinopse: {
      marginTop: 20,
      maxWidth: "90%",
    },
    containerContent: {
      padding: 20,
      width: "100%",
    },
    titleSimilar: {
      color: "#2d1919",
      fontSize: 25,
      fontWeight: "bold",
      marginTop: 30,
      marginBottom: 10,
    }
  });

  const [movie, setMovie] = React.useState(JSON.parse(localStorage.getItem("@movie")));
  const [url, setUrl] = React.useState("");
  const [urlCard, setUrlCard] = React.useState("");
  const [credits, setCredits] = React.useState({});
  const [config, setConfig] = React.useState(JSON.parse(localStorage.getItem("@config")));
  const head = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + EXPO_TMDB_API_TOKEN,
    },
  };

  function getUrl() {
    handleImages();
  }

  const getCredits = async () => {
    response = await getData(`https://api.themoviedb.org/3/movie/${movie.id}/credits?language=pt-BR`, head);
    setCredits(response.data);
  }

  const handleImages = () => {
    setUrl(
      config.images.secure_base_url +
      config.images.backdrop_sizes[config.images.backdrop_sizes.length - 1] +
      movie.backdrop_path
    )

    setUrlCard(
      config.images.secure_base_url +
      config.images.backdrop_sizes[1] +
      movie.backdrop_path
    );
  }

  React.useEffect(() => {
    getCredits();
    getUrl();
  }, []);

  return <>
    <Body>
      <ScrollView>
        <View style={styles.containerView}>
          <View style={styles.backdropImg}></View>
          <ImageBackground
            source={{ uri: url }}
            style={styles.imgBackground}
          >
          </ImageBackground>
          <View style={styles.containerCard}>
            <CardCustom
              url={urlCard}
              widthCard={Dimensions.get("window").height / 3}
              heightCard={Dimensions.get("window").height / 2.5}
              borderRadius={10}
              content={false}
            />
          </View>
          <View style={styles.dataMovie}>
            <Text style={styles.titleMovie}>{movie.title} ({new Date(movie.release_date).getFullYear()})</Text>
            <View style={styles.containerRating}>
              <Text style={styles.ratingMovie} variant="bodyMedium">{movie.vote_average.toFixed(2)}</Text>
              <Fontisto name="star" size={15} color="white" />
            </View>
            <View style={styles.containerGenres}>
              {movie.searchedDetails.genres.map((genre) => {
                return <Text variant="bodyMedium" style={styles.genresMovie} key={genre.id}>{genre.name}</Text>
              })}
            </View>
            <View style={styles.containerSinopse}>
              <Text style={styles.titleSinopse}>Sinopse</Text>
              <Text style={styles.sinopse}>{movie.overview}</Text>
            </View>
          </View>
          <View style={styles.containerContent}>
            <View>
              <Text style={styles.titleSimilar}>Elenco:</Text>
              <ScrollView horizontal={true}>
                {credits.cast &&
                  credits.cast.map((actor) => {
                    return (<CardCustom
                      content={true}
                      styleCover={{
                        position: "relative",
                        height: 250,
                      }}
                      url={
                        config.images.secure_base_url +
                        config.images.backdrop_sizes[config.images.backdrop_sizes.length - 1] +
                        actor.profile_path
                      }
                      styleContainer={{
                        width: 500,
                      }}
                    >
                      <Text>{actor.name}</Text>
                      <Text>{actor.character}</Text>
                    </CardCustom>)
                  })
                }
              </ScrollView>
              <Text style={styles.titleSimilar}>Equipe:</Text>
              <ScrollView horizontal={true}>
                {
                  credits.crew &&
                  credits.crew.map((crewMember) => {
                    return (<CardCustom
                      content={true}
                      styleCover={{
                        position: "relative",
                        height: 250,
                      }}
                      url={
                        config.images.secure_base_url +
                        config.images.backdrop_sizes[config.images.backdrop_sizes.length - 1] +
                        crewMember.profile_path
                      }
                      styleContainer={{
                        width: 500,
                      }}
                    >
                      <Text>{crewMember.name}</Text>
                      <Text>{crewMember.department} - {crewMember.job}</Text>
                    </CardCustom>)
                  })
                }
              </ScrollView>
              <Text style={styles.titleSimilar}>Filmes Similares:</Text>
              <ScrollView horizontal={true}>
                {
                  movie.searchedSimilars.results.map((similarMovie) => {
                    return (<MovieCard
                      data={similarMovie}
                      styleContainer={{
                        width: 500,
                      }}
                    />)
                  })
                }
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </Body>
  </>
}

export default Details;