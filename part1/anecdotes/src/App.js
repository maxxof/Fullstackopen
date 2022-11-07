import { useState } from 'react'
import './App.css'

const Button = props => <button onClick={props.handleClick}>{props.text}</button>

const Display = props => {
  return (
    <div>
      <h1>{props.header}</h1>
      <p>{props.text}</p>
      <p>has {props.value} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])
  const max = Math.max(...points)
  const indexOfMax = points.indexOf(max)

  const next = () => {
    const num = Math.floor(Math.random() * 7)
    setSelected(num)
  }

  const vote = (index) => {
    const copy = [...points]
    copy[index] += 1
    setPoints(copy)
  }

  return (
    <div>
      <Display header='Anecdote of the day' text={anecdotes[selected]} value={points[selected]}/>
      <Button handleClick={() => vote(selected)} text='vote'/>
      <Button handleClick={() => next()} text='next anecdote'/>
      <Display header='Anecdote with the most votes' text={anecdotes[indexOfMax]} value={points[indexOfMax]}/>
    </div>
  )
}

export default App