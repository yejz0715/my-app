import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001",
});

export const mainApi = {
    getContents: () => api.get("/chapter"),
};
