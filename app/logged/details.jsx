import { Text, View, ScrollView, StyleSheet, ImageBackground, Dimensions, Image } from 'react-native';
import * as React from 'react';
import Fontisto from '@expo/vector-icons/Fontisto';
import QRCode from 'react-native-qrcode-svg';

import { getData } from "../../api/manipulateData.js";

import Body from '../../src/components/body/index.jsx';
import CardCustom from '../../src/components/card/index.jsx';
import MovieCard from "../../src/components/moviecard/index.jsx";
import { EXPO_TMDB_API_TOKEN } from "../../env.json";
import { secure_base_url, backdrop_sizes } from "../../src/constants/configs.json";
import { useLocalSearchParams } from 'expo-router';

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
    },
    containerShareQrCode: {
      marginTop: 40,
      padding: 10,
      width: "100%",
      alignItems: "center",
    },
    titleQrCode: {
      fontSize: 25,
      fontWeight: "bold",
      alignSelf: "start",
      marginBottom: 30,
    }
  });

  const [movie, setMovie] = React.useState(useLocalSearchParams());
  const [linkQrCode, setLinkQrCode] = React.useState(undefined);
  const [url, setUrl] = React.useState("");
  const [urlCard, setUrlCard] = React.useState("");
  const [credits, setCredits] = React.useState({});
  const [config, setConfig] = React.useState({});
  const head = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + EXPO_TMDB_API_TOKEN,
    },
  };
  const getUrl = async () => {
    const responseDetails = await getData(`https://api.themoviedb.org/3/movie/${movie.id}?language=pt-BR`, head);
    movie["searchedDetails"] = responseDetails.data;

    const responseSimilars = await getData(`https://api.themoviedb.org/3/movie/${movie.id}/similar?language=pt-BR&page=1`, head);
    movie["searchedSimilars"] = responseSimilars.data;

    await handleImages();
  }

  const getCredits = async (movieTemp) => {
    response = await getData(`https://api.themoviedb.org/3/movie/${movieTemp.id}/credits?language=pt-BR`, head);
    setCredits(response.data);
  }

  const handleImages = async () => {
    setUrl(
      secure_base_url +
      backdrop_sizes[backdrop_sizes.length - 1] +
      movie.backdrop_path
    )

    setUrlCard(
      secure_base_url +
      backdrop_sizes[1] +
      movie.backdrop_path
    );

    await getWatchProviders(movie);
    await getCredits(movie);
  }

  const getWatchProviders = async (movieTemp) => {
    const response = await getData(`https://api.themoviedb.org/3/movie/${movieTemp.id}/watch/providers`, head);
    if (response.data.results["BR"]?.link) {
      setLinkQrCode(response.data.results["BR"].link);
    }
  };

  React.useEffect(() => {
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
              <Text style={styles.ratingMovie} variant="bodyMedium">{movie.vote_average ? parseFloat(movie?.vote_average).toFixed(2) : ""}</Text>
              <Fontisto name="star" size={15} color="white" />
            </View>
            <View style={styles.containerGenres}>
              {movie.searchedDetails ?
                movie.searchedDetails.genres.map((genre) => {
                  return <Text variant="bodyMedium" style={styles.genresMovie} key={genre.id}>{genre.name}</Text>
                }) :
                <Text></Text>
              }
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
                      key={actor.name+actor.character}
                      content={true}
                      styleCover={{
                        position: "relative",
                        height: 250,
                      }}
                      url={
                        secure_base_url +
                        backdrop_sizes[backdrop_sizes.length - 1] +
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
                      key={crewMember.name+crewMember.department+crewMember.job}
                      content={true}
                      styleCover={{
                        position: "relative",
                        height: 250,
                      }}
                      url={
                        secure_base_url +
                        backdrop_sizes[backdrop_sizes.length - 1] +
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
                  movie.searchedSimilars ?
                    movie.searchedSimilars.results.map((similarMovie) => {
                      return (<MovieCard
                        key={similarMovie.title+similarMovie.id}
                        data={similarMovie}
                        styleContainer={{
                          width: 500,
                        }}
                      />)
                    }) :
                    <Text></Text>
                }
              </ScrollView>
            </View>
            {linkQrCode &&
              <View style={styles.containerShareQrCode}>
                <Text style={styles.titleQrCode}>Mais Informações:</Text>
                <QRCode
                  value={linkQrCode}
                  size={200}
                  color="black"
                  backgroundColor="white"
                />
              </View>
            }
          </View>
        </View>
      </ScrollView>
    </Body>
  </>
}

export default Details;