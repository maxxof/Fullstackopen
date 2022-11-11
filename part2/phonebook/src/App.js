import { useState } from 'react'

const Person = ({ person, number}) => {
  return (
    <div>{person} {number}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas', number: '046-1235346', id: 1
    }, 
    {
      name: 'Ada Lovelace', number: '05023454567', id: 2
    }, 
    {
      name: 'Dan Abramov', number: '045-5467256', id: 3
    },
    {
      name: 'Mary Poppendieck', number: '1234-435645', id: 4
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const isDuplicate = persons.some(person => person.name === newName)

    if (isDuplicate === true) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    if (newName !== '') {
      const personObject = {
        name: newName, 
        id: persons.length + 1, 
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input 
        value={newFilter}
        onChange={handleFilterChange}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber} 
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.flatMap(person => person.name.toLowerCase().includes(newFilter) ? 
        <Person 
        key={person.id} 
        person={person.name} 
        number={person.number} 
        /> :
        ''
        )}
      </div>
    </div>
  )
}

export default App