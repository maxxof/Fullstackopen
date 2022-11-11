import { useState } from 'react'

const Person = ({ person }) => <div>{person}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      id: 1 
    }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const isDuplicate = persons.some(person => person.name === newName)

    if (isDuplicate === true) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName, 
      id: persons.length + 1
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
        <Person key={person.id} person={person.name} />
        )}
      </div>
    </div>
  )
}

export default App