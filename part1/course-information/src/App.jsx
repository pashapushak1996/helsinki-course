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
    const {parts, exercises} = props;

    return (
        <div>
            <Part part={parts[0]} numberOfexercises={exercises[0]}/>
            <Part part={parts[1]} numberOfexercises={exercises[1]}/>
            <Part part={parts[2]} numberOfexercises={exercises[2]}/>
        </div>
    )
};

const Total = (props) => {
    return (
        <p>Number of exercises {props.total}</p>
    )
}

const App = () => {
    const course = 'Half Stack application development';
    const part1 = 'Fundamentals of React';
    const exercises1 = 10;
    const part2 = 'Using props to pass data';
    const exercises2 = 7;
    const part3 = 'State of a component';
    const exercises3 = 14;

    const exercises = [exercises1, exercises2, exercises3];
    const parts = [part1, part2, part3];

    return (
        <div>
            <Header title={course}/>
            <Content parts={parts} exercises={exercises}/>
            <Total total={exercises1 + exercises2 + exercises3}/>
        </div>
    )
}

export default App;