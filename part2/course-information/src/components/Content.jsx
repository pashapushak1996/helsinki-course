import {Part} from "./Part.jsx";

export const Content = ({parts}) => {
    return (
        <>
            {parts.map((part) =>
                <Part key={part.id} partName={part.name} numberOfexercises={part.exercises}/>
            )}
        </>
    )
};