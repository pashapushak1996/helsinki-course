import {useState} from "react";

const Button = ({onClick, text}) => {
    return <button onClick={onClick}>{text}</button>
};


const StatisticLine = (props) => <li>{props.text}:{props.value}</li>;

const Statistics = (props) => {
    const {good, neutral, bad} = props;


    const total = good + neutral + bad;
    const average = (good + neutral + bad) / 3;
    const positivePercentage = (good / total) * 100;


    return (

        <ul>
            <StatisticLine text={'good'} value={good}/>
            <StatisticLine text={'neutral'} value={neutral}/>
            <StatisticLine text={'bad'} value={bad}/>
            <StatisticLine text={'average'} value={average}/>
            <StatisticLine text={'all'} value={total}/>
            <StatisticLine text={'positive'} value={positivePercentage + '%'}/>
        </ul>

    )
};


function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (feedbackType) => () => {
        setIsClicked(true);
        switch (feedbackType) {
            case 'good': {
                return setGood(good + 1);
            }
            case 'neutral': {
                return setNeutral(neutral + 1);
            }
            case 'bad': {
                return setBad(bad + 1);
            }
        }
    }
    return (
        <>
            <h2>give feedback</h2>
            <Button text={'good'} onClick={handleClick('good')}/>
            <Button text={'neutral'} onClick={handleClick('neutral')}/>
            <Button text={'bad'} onClick={handleClick('bad')}/>
            <h2>statistics</h2>
            {isClicked
                ? <Statistics good={good} bad={bad} neutral={neutral}/>
                : <p>No feedback given</p>}

        </>
    )
}

export default App;
