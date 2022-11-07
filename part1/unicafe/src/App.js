import { useState } from 'react'

const Header = props => <h1>{props.text}</h1>

const Button = props => <button onClick={props.handleClick}>{props.text}</button>

const Stats = (props) => {
  const { goods, neutrals, bads } = props.all
  const sum = goods+neutrals+bads
  const average = () => {
    if (sum === 0) {
      return 0
    }
    else {
      return (goods-bads)/(goods+neutrals+bads)
    }
  }
  const positive = () => {
    if (sum === 0) {
      return 0
    }
    else {
      return 100*goods/(goods+neutrals+bads)
    }
  }

  return (
    <div>
      <p>good {goods}</p>
      <p>neutral {neutrals}</p>
      <p>bad {bads}</p>
      <p>all {sum}</p>
      <p>average {average()}</p>
      <p>positive {positive()} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = { goods: good, neutrals: neutral, bads: bad }

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