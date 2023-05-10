export const Country = ({ country, onShowClick }) => {
    return (
        <div >
            <span>{ country.name }</span>
            <button onClick={ onShowClick }>show</button>
        </div>
    );
};