const Header = (props) => {
    return (
        <h1>{props.title}</h1>
    )
};

const Part = (props) => {
    return (
        <p>{props.part} {props.numberOfexercises}</p>
    )
}

const Content = (props) => {
    const {parts} = props;


    return (
        <div>
            <Part part={parts[0].name} numberOfexercises={parts[0].exercises}/>
            <Part part={parts[1].name} numberOfexercises={parts[1].exercises}/>
            <Part part={parts[2].name} numberOfexercises={parts[2].exercises}/>
        </div>
    )
};

const Total = (props) => {
    const totalOfExercises = props.total.reduce((acc, curr) => curr.exercises + acc, 0);

    return (
        <p>Number of exercises {totalOfExercises}</p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header title={course.name}/>
            <Content parts={course.parts}/>
            <Total total={course.parts}/>
        </div>
    )
}

export default App;