import { useState } from 'react'

const Header = props => <h1>{props.text}</h1>

const Button = props => <button onClick={props.handleClick}>{props.text}</button>

const Stats = props => {
  return (
    <div>
      <p>good {props.all.good}</p>
      <p>neutral {props.all.neutral}</p>
      <p>bad {props.all.bad}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = { good: good, neutral: neutral, bad: bad }

  const setToValue = (newVal, state) => {
    if (state === 'good') {
      setGood(newVal)
    }
    else if (state === 'neutral') {
      setNeutral(newVal)
    }
    else {
      setBad(newVal)
    }
  }

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => setToValue(good+1, 'good')} text='good' />
      <Button handleClick={() => setToValue(neutral+1, 'neutral')} text='neutral' />
      <Button handleClick={() => setToValue(bad+1, 'bad')} text='bad' />
      <Header text='statistics' />
      <Stats all={all} />
    </div>
  )
}

export default App