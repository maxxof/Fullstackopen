import { useState } from 'react'

const Header = props => <h1>{props.text}</h1>

const Button = props => <button onClick={props.handleClick}>{props.text}</button>

const StatisticsLine = ({ text, value, sign}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {sign}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const { goods, neutrals, bads } = props.all
  const sum = goods+neutrals+bads
  const average =  (goods-bads)/sum
  const positive = 100*goods/sum

  if (sum === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text='good' value={goods}/>
        <StatisticsLine text='neutral' value={neutrals}/>
        <StatisticsLine text='bad' value={bads}/>
        <StatisticsLine text='all' value={sum}/>
        <StatisticsLine text='average' value={average}/>
        <StatisticsLine text='positive' value={positive} sign={'%'}/>
      </tbody>
    </table>
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
      <Statistics all={all} />
    </div>
  )
}

export default App