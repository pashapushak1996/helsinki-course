import { useEffect, useState } from 'react'
import { Persons } from "./components/Persons.jsx";
import { PersonForm } from "./components/PersonForm.jsx";
import { Filter } from "./components/Filter.jsx";
import { personsApi } from "./services/persons.js";
import { Notification } from "./components/notification/Notification.jsx";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState(null);

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
        personsApi.update(id, newPerson)
            .then((updatedPerson) => {
                const changedPersons = persons.map((person) => person._id === id
                    ? updatedPerson
                    : person);

                setPersons(changedPersons);
            })
            .catch(() => {
                setPersons(persons.filter((person) => person._id !== id));
                setMessage({
                    type: 'error',
                    body: `Information of ${ newPerson.name } has already been removed from server`
                });
            })
            .finally(() => {
                setTimeout(() => {
                    setMessage(null)
                }, 3000)
            })
    }

    // This is for deleting person
    const deletePerson = (id) => {
        personsApi.delete(id).then(() => {
            alert(`person ${ id } deleted`);
            setPersons(persons.filter((person) => person._id !== id));
        });
    }

    const addPerson = async (name, number) => {
        try {

            const newPerson = { name, number };


            const foundPerson = persons.find((person) => person.name === name);

            if (foundPerson) {
                const replaceNumberConfirmation = confirm(`${ name } is already added to phonebook, replace the old number with a new one`);

                if (replaceNumberConfirmation) {
                    updatePersonNumber(foundPerson._id, { ...foundPerson, number })
                }

                return;
            }

            const createdPerson = await personsApi.create(newPerson);

            setPersons(persons.concat(createdPerson));
        } catch (e) {
            setMessage({
                type: 'error',
                body: e.response.data.error
            });

        } finally {
            setTimeout(() => {
                setMessage(null);
            }, 4000)
        }
    };


    const personsToRender = search
        ? persons.filter((person) => person.name.trim().toLowerCase().includes(search))
        : persons;

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={ message }/>
            <Filter search={ search } handleSearchChange={ handleSearchChange }/>
            <h2>Numbers</h2>
            <PersonForm addPerson={ addPerson }/>
            <Persons persons={ personsToRender } deletePerson={ deletePerson }/>
        </div>
    )
}

export default App;