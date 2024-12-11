import axios from "axios";

async function getData(url, head) {
    let data;
    await axios
        .get(url, head)
        .then((response) => {
            data = { data: response.data, message: response.message };
        })
        .catch((error) => {
            data = { data: {}, message: "Erro: " + error };
        });

    return data;
}

export { getData }