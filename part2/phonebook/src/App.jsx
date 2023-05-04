import { useState } from 'react'
import { Persons } from "./components/Persons.jsx";
import { PersonForm } from "./components/PersonForm.jsx";
import { Filter } from "./components/Filter.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {
            id: Date.now().toString(),
            name: 'Arto Hellas',
            number: '39-44-4433567'
        }
    ]);

    const [search, setSearch] = useState('');

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