import { Text, View, StyleSheet } from 'react-native';
import Body from '../../src/components/body/index.jsx';
import { useEffect, useState } from 'react';
import { getData } from "../../api/manipulateData.js"
import Input from "../../src/components/input/input.jsx";
import { EXPO_TMDB_API_TOKEN } from "../../env.json";
import { genres as genresConfig } from "../../src/constants/configs.json";
import colors from "../../src/constants/colors.js";
import { PickerCustom, PickerItem } from "../../src/components/picker/picker.jsx";
import { CustomButton } from "../../src/components/button/index.jsx";
import FlatList from "../../src/components/flatList/flatList.jsx";
import MovieCard from "../../src/components/moviecard/index.jsx";
import { Icon } from 'react-native-elements';

const Search = ({ navigation }) => {
  let paginaTemp = 1;
  const [paginaSearch, setPaginaSearch] = useState(1);
  const [searchGenres, setSearchGenres] = useState(false);
  const [genres, setGenres] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchYear, setSearchYear] = useState(false);
  const [year, setYear] = useState("");
  const [searchVote, setSearchVote] = useState(false);
  const [voteAverage, setVoteAverage] = useState("");
  const [movies, setMovies] = useState([]);
  const head = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + EXPO_TMDB_API_TOKEN,
    },
  };

  const handleSearch = async (type="search", pagina=1) => {
    
    const genresQuery = searchGenres ? "&with_genres=" + genres : "";
    const yearQuery = searchYear ? "&primary_release_year=" + year : "";
    const voteQuery = searchVote ? "&vote_average.gte=" + voteAverage : "";
    const urlSearch = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${pagina}&sort_by=popularity.desc${genresQuery}${yearQuery}${voteQuery}`;
    const response = await getData(urlSearch, head);
    if(type === "pagination") {
      setMovies([...movies, ...response.data.results]);
    } else {
      setMovies([...response.data.results]);
    }
    setPaginaSearch(pagina);
  };

  const handleAddGenre = (newGenre) => {
    if (newGenre === "") {
      setGenres("");
      setSearchGenres(false);
    } else {
      let tempGenre = genres;
      tempGenre = tempGenre + "," + newGenre;

      if (genres === "") {
        tempGenre = newGenre;
      }

      setGenres(tempGenre);
      setSearchGenres(true);
    }
    setSelectedGenre(newGenre);
  };

  const handlePagination = async () => {
    await handleSearch("pagination", paginaSearch+1);
  };

  const renderComponent = (movie) => {
    return <MovieCard
      data={movie.item}
    />
  };

  const getComponentKey = (movie) => {
    return movie.item.title + movie.item.id;
  };

  return <>
    <Body>
      <View style={styles.containerSearchBars}>
        <Text style={styles.tituloPagina}>Pesquise</Text>
        <View style={styles.containerTextSearch}>
          <Input
            label="Ano de Lançamento"
            onChangeText={(text) => {
              setYear(text);
              text !== "" ? setSearchYear(true) : setSearchYear(false);
            }}
            value={year || ""}
            mode="outlined"
            style={styles.searchYear}
          />
          <Input
            label="Nota Mínima (0 a 10)"
            onChangeText={(text) => {
              setVoteAverage(text);
              text !== "" ? setSearchVote(true) : setSearchVote(false);
            }}
            value={voteAverage || ""}
            mode="outlined"
            style={styles.searchYear}
          />
        </View>
        <View style={styles.containerTextSearch}>
          <PickerCustom
            style={styles.pickerGenre}
            onValueChange={(value) => { handleAddGenre(value) }}
            labelStartValue="Escolha um Gênero..."
            selectedValue={selectedGenre}
          >
            {
              genresConfig.map((genre) => {
                return <PickerItem key={genre.name+genre.id} label={genre.name} value={genre.id} />
              })
            }
          </PickerCustom>
          <View style={styles.btnContainer}>
            <CustomButton style={styles.btn} onPress={handleSearch}>
              <Icon name="search" type="ionicon" color="#fff" />
            </CustomButton>
          </View>
        </View>
      </View>
      <FlatList
        data={movies}
        style={{alignSelf: "center",}}
        extraData={0}
        onEndReached={() => handlePagination()}
        onEndReachedThreshold={0}
        renderItem={(movie) => renderComponent(movie)}
        keyExctractor={(movie) => getComponentKey(movie)}
      />
    </Body>
  </>
}

const styles = StyleSheet.create({
  tituloPagina: {
    alignSelf: "start",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },
  containerSearchBars: {
    width: "80%",
    alignSelf: "center",
    padding: 10,
  },
  containerTextSearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: 60,
  },
  searchYear: {
    marginVertical: 5,
    width: "49%",
  },
  btnContainer: {
    marginVertical: 5,
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: "100%",
    backgroundColor: colors().GoldenSunrise,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 5,
  },
  pickerGenre: {
    padding: 13,
    marginVertical: 10,
    borderRadius: 5,
    width: "80%",
    height: "90%",
  },
});

export default Search;