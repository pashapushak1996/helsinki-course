import { useEffect, useState } from 'react'
import { Persons } from "./components/Persons.jsx";
import { PersonForm } from "./components/PersonForm.jsx";
import { Filter } from "./components/Filter.jsx";
import axios from "axios";

const BASE_URL = 'http://localhost:3001';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [search, setSearch] = useState('');

    const fetchPersons = () => {
        axios
            .get(BASE_URL + '/persons')
            .then((response) => {
                setPersons(response.data)
            });
    }

    useEffect(fetchPersons, []);

    const handleSearchChange = ({ target }) => {
        setSearch(target.value);
    };

    const addPerson = (name, number) => {
        const newPerson = {
            id: Date.now().toString(),
            name: name,
            number: number
        }

        const isPersonExist = persons.find((person) => person.name === name);

        if (isPersonExist) {
            alert(`${ name } is already added to phonebook`);

            return;
        }

        setPersons(persons.concat(newPerson));
    };

    const personsToRender = search
        ? persons.filter((person) => person.name.trim().toLowerCase().includes(search))
        : persons;

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter search={ search } handleSearchChange={ handleSearchChange }/>
            <h2>Numbers</h2>
            <PersonForm addPerson={ addPerson }/>
            <Persons persons={ personsToRender }/>
        </div>
    )
}

export default App;