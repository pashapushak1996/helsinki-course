import { useEffect, useState } from 'react'
import { Persons } from "./components/Persons.jsx";
import { PersonForm } from "./components/PersonForm.jsx";
import { Filter } from "./components/Filter.jsx";
import axios from "axios";
import { personsApi } from "./services/persons.js";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(fetchPersons, []);

    const handleSearchChange = ({ target }) => {
        setSearch(target.value);
    };

    // This is  for fetching persons
    function fetchPersons() {
        personsApi.getAll()
            .then((users) => {
                setPersons(users);
            });
    }

    // This is for updating person
    const updatePersonNumber = (id, newPerson) => {
        personsApi.update(id, newPerson).then((updatedPerson) => {
            const changedPersons = persons.map((person) => person.id === id ? updatedPerson : person);

            setPersons(changedPersons);
        })
    }

    // This is for deleting person
    const deletePerson = (id) => {
        personsApi.delete(id).then(() => {
            alert(`person ${ id } deleted`);
            setPersons(persons.filter((person) => person.id !== id));
        });
    }

    // This is for creating person
    const createPerson = (person) => {
        personsApi.create(person)
            .then((newPerson) => {
                setPersons(persons.concat(newPerson));
            });
    }

    const addPerson = (name, number) => {
        const newPerson = { name, number };


        const foundPerson = persons.find((person) => person.name === name);

        if (foundPerson) {
            const replaceNumberConfirmation = confirm(`${ name } is already added to phonebook, replace the old number with a new one`);

            if (replaceNumberConfirmation) {
                updatePersonNumber(foundPerson.id, { ...foundPerson, number })
            }

            return;
        }

        createPerson(newPerson);
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
            <Persons persons={ personsToRender } deletePerson={ deletePerson }/>
        </div>
    )
}

export default App;