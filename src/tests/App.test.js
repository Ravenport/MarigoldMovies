import { fireEvent, render, screen } from "@testing-library/react-native";
import Index from "../../app/index";
import Details from "../../app/details";
import Scanner from "../../app/scanner";
import Search from "../../app/search";

import Container from "../components/container/index";
import MovieCard from "../components/moviecard/index";
import Card from "../components/card/index";
import Input from "../components/input/input";
import FlatList from "../components/flatList/flatList";
import { PickerCustom, PickerItem } from "../components/picker/picker";

import { getData } from "../../api/manipulateData";

import { EXPO_TMDB_API_TOKEN } from "../../env.json";

const HEAD = {
    headers: {
        accept: "application/json",
        Authorization: "Bearer " + EXPO_TMDB_API_TOKEN,
    },
};

const MOVIE = {
    "adult": false,
    "backdrop_path": "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
    "genre_ids": [28, 878, 12, 53],
    "id": 912649,
    "original_language": "en",
    "original_title": "Venom: The Last Dance",
    "overview": "Eddie e Venom estão fugindo. Perseguidos pelos dois mundos, a dupla é forçada a tomar uma decisão devastadora que vai fechar as cortinas da última rodada de Venom e Eddie.",
    "popularity": 9823.665,
    "poster_path": "/jQ92em8SMpu0ufGUtZNVlvxO4Qr.jpg",
    "release_date": "2024-10-22",
    "searchedImg": "https://image.tmdb.org/t/p/original/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
    "title": "Venom: A Última Rodada",
    "video": false,
    "vote_average": 6.755,
    "vote_count": 1436
};

// Testes para os componentes ----------------

test("teste componente Container", () => {
    const containerComponent = render(<Container />);
    const container = screen.getByTestId("container");
    const alignmentContainer = screen.getByTestId("alignmentContainer");
    expect(container).toBeTruthy();
    expect(alignmentContainer).toBeTruthy();
    expect(alignmentContainer).toBeDefined();
    expect(alignmentContainer).toBeDefined();
});

test("teste componente MovieCard", () => {
    const functionTeste = jest.fn();
    const movieCard = render(<MovieCard teste={true} functionTeste={functionTeste} data={MOVIE} />);
    const button = screen.getByTestId("movieCardButton");
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(functionTeste).toHaveBeenCalledTimes(1);

    const img = screen.getByTestId("cardCover");
    expect(img).toBeTruthy();
});

test("teste componente Card", () => {
    const card = render(<Card />);
    const img = screen.getByTestId("cardCover");
    expect(img).toBeTruthy();
});

test("teste componente Input", () => {
    const functionTeste = jest.fn();
    const input = render(<Input onChangeText={functionTeste} label="teste" value="teste" />)
    const TextInput = screen.getByTestId("input");
    expect(TextInput).toBeTruthy();
    fireEvent.changeText(TextInput);
    expect(functionTeste).toHaveBeenCalledTimes(1);

});

test("teste componente FlatList", () => {
    const flatList = render(<FlatList />);
    const fl = screen.getByTestId("flatList");
    expect(fl).toBeDefined();
    expect(fl).toBeTruthy();
});

test("teste componente Picker", () => {
    const picker = render(<PickerCustom labelStartValue="Teste"></PickerCustom>);
    const container = screen.getByTestId("pickerContainer");
    expect(container).toBeDefined();
});

// Testes para os componentes ----------------

// Testes para consumo da api ----------------

test("teste de consumo da api Em Cartaz", async () => {
    const urlCartaz = `https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1`;
    const response = await getData(urlCartaz, HEAD);
    expect(response.message).toBeUndefined();
    expect(response.data).not.toBeUndefined();
    expect(response.data).not.toBeNull();
});

test("teste de consumo da api Em Alta", async () => {
    const urlAlta = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`;
    const response = await getData(urlAlta, HEAD);
    expect(response.message).toBeUndefined();
    expect(response.data).not.toBeUndefined();
    expect(response.data).not.toBeNull();
});

test("teste de consumo da api Search", async () => {
    const yearQuery = "&primary_release_year=" + 2024;
    const voteQuery = "&vote_average.gte=" + 7;
    const urlSearch = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc${yearQuery}${voteQuery}`;
    const response = await getData(urlSearch, HEAD);
    expect(response.message).toBeUndefined();
    expect(response.data).not.toBeUndefined();
    expect(response.data).not.toBeNull();
});

// Testes para consumo da api ----------------