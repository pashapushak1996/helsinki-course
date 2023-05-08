export const Person = ({ name, number, deletePerson }) => {
    return (
        <>
            <span>{ name }: { number }</span>
            <button onClick={ deletePerson }>delete</button>
        </>
    );
};