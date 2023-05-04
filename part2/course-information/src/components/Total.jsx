export const Total = ({parts}) => {
    const totalOfExercises = parts.reduce((acc, curr) => curr.exercises + acc, 0);

    return (
        <strong>Total of {totalOfExercises} exercises</strong>
    )
}