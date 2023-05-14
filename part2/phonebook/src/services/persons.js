import axios from "axios";

/* This is for changing relative path */
axios.defaults.baseURL = 'http://localhost:3001';

const BASE_URL = '/api/persons';

export const personsApi = {
    getAll: async () => {
        const response = await axios.get(BASE_URL);

        return response.data;
    },

    create: async (person) => {
        const response = await axios.post(BASE_URL, person);

        return response.data;
    },

    update: async (id, newPerson) => {
        const response = await axios.put(`${ BASE_URL }/${ id }`, newPerson);

        return response.data;
    },

    delete: async (id) => {
        await axios.delete(`${ BASE_URL }/${ id }`);
    },
};

