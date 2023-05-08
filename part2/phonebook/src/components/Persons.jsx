import { Person } from "./Person.jsx";

export const Persons = ({ persons, deletePerson }) => {
    const handleDelete = (id) => {
        if (confirm('Do you want to delete this contact?')) {
            deletePerson(id)
        }
    };

    return (
        <>
            { persons.map((person) =>
                <Person key={ person.name }
                        deletePerson={ () => handleDelete(person.id) }
                        name={ person.name }
                        number={ person.number }/>) }
        </>
    );
};