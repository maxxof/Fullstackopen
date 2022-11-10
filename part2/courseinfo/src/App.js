const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />)}
    </>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Total = ({ parts }) => {
  let sum = 0
  parts.forEach(part => {
    sum += part.exercises
  })
  return <div><b>total of {sum} exercises</b></div>
}

const App = () => {
  const course = {
    id: 1, 
    name: 'Half Stack application development', 
    parts: [
      {
        name: 'Fundamentals of React', 
        exercises: 10, 
        id: 1
      }, 
      {
        name: 'Using props to pass data', 
        exercises: 7, 
        id: 2
      },
      {
        name: 'State of a component', 
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App