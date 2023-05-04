import { useState } from "react";

export const PersonForm = (props) => {
    const { addPerson } = props;

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleNameChange = ({ target }) => {
        setNewName(target.value);
    };

    const handleNumberChange = ({ target }) => {
        setNewNumber(target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        addPerson(newName, newNumber);

        setNewName('');
        setNewNumber('');
    }

    return (
        <form onSubmit={ handleSubmit }>
            <h2>add a new</h2>
            <div>
                name: <input value={ newName } onChange={ handleNameChange }/>
            </div>
            <div>
                number: <input value={ newNumber } onChange={ handleNumberChange }/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};