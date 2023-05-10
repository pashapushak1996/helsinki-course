export const Person = ({ name, number, deletePerson }) => {
    return (
        <div>
            <span>{ name }: { number }</span>
            <button onClick={ deletePerson }>delete</button>
        </div>
    );
};