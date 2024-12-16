import { View, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect, useCallback } from "react";

import Body from '../../src/components/body/index.jsx';
import Container from "../../src/components/container/index.jsx";
import MovieCard from "../../src/components/moviecard/index.jsx";
import Carousel from '../../src/components/carousel/index.jsx';
import { EXPO_TMDB_API_TOKEN } from "../../env.json";
import { getData } from "../../api/manipulateData.js";

const Index = ({ navigation }) => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [pageNowPlaying, setPageNowPlaying] = useState(1);

  const [trending, setTrending] = useState([]);
  const [pageTrending, setPageTrending] = useState(1);

  const [trendingDay, setTrendingDay] = useState([]);
  const [trendingWeek, setTrendingWeek] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const config = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + EXPO_TMDB_API_TOKEN,
    },
  };

  async function loadMovies() {
    const nowPlayingResp = await getData(
      `https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1`,
      config
    );
    setNowPlaying([...nowPlaying, ...nowPlayingResp.data.results]);

    const trendingResp = await getData(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`,
      config
    );
    setTrending([...trending, ...trendingResp.data.results]);

    const trendingDayResp = await getData(
      'https://api.themoviedb.org/3/trending/movie/day?language=pt-BR',
      config
    );
    setTrendingDay(trendingDayResp.data.results);

    const trendingWeekResp = await getData(
      'https://api.themoviedb.org/3/trending/movie/week?language=pt-BR',
      config
    );
    setTrendingWeek(trendingWeekResp.data.results);
  }

  const refresh = useCallback(() => {
    setRefreshing(true);
    navigation.navigate("Home");
  }, []);

  const handlePagination = (type) => {
    switch (type) {
      case "nowPlaying":
        const nPPage = pageNowPlaying+1;
        setPageNowPlaying(nPPage);
      break;
      case "trending":
        const tPage = pageTrending+1;
        setPageTrending(tPage);
      break;
    }
  };

  const paginateData = async (url, setData, data) => {
    const response = await getData(url, config);
    setData([...data, ...response.data.results]);
  }

  useEffect(() => {
    paginateData(`https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=${pageNowPlaying}`, setNowPlaying, nowPlaying);
  }, [pageNowPlaying]);

  useEffect(() => {
    paginateData(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${pageTrending}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`,
      setTrending,
      trending
    );
  }, [pageTrending]);

  useEffect(() => {
    loadMovies();
  }, []);

  return <>
    <Body>
      <ScrollView>
        <Container>
          <View style={styles.containerCard}>
            {nowPlaying && <Carousel lastItem={() => handlePagination("nowPlaying")} marginTop={20} marginBottom={80} title="Em Cartaz" items={nowPlaying}><MovieCard /></Carousel>}
            {trending && <Carousel lastItem={() => handlePagination("trending")} marginTop={20} marginBottom={80} title="Em Alta" items={trending}><MovieCard /></Carousel>}
            {trendingDay && <Carousel lastItem={() => {}} marginTop={20} marginBottom={80} title="Em Alta Hoje" items={trendingDay}><MovieCard /></Carousel>}
            {trendingWeek && <Carousel lastItem={() => {}} marginTop={20} marginBottom={80} title="Em Alta na Ultima Semana" items={trendingWeek}><MovieCard /></Carousel>}
          </View>
        </Container>
      </ScrollView>
    </Body>
  </>
}

const styles = StyleSheet.create({
  containerCard: {
    width: "100%",
    alignItems: "center",
  },
});

export default Index;