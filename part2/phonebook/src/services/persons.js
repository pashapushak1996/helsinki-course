import axios from "axios";

const BASE_URL = 'http://localhost:3001';

export const personsApi = {
    getAll: async () => {
        const response = await axios.get(`${ BASE_URL }/persons`);

        return response.data;
    },

    create: async (person) => {
        const response = await axios.post(`${ BASE_URL }/persons`, person);

        return response.data;
    },

    update: async (id, newPerson) => {
        const response = await axios.put(`${ BASE_URL }/persons/${ id }`, newPerson);

        return response.data;
    },

    delete: async (id) => {
        await axios.delete(`${ BASE_URL }/persons/${ id }`);
    },
};

