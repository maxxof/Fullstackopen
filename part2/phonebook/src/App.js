import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, number, handleClick}) => {
  return (
    <div>
      {person} {number}
      &nbsp;&nbsp;
      <button onClick={handleClick}>delete</button>
    </div>
  )
}

const PersonsRenderer = ({ persons, newFilter, setPersons }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter))

  const handleClick = (id, name) => event => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
      .deletePerson(id)
      .then()
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <>
    {filteredPersons.map(person => 
      <Person 
      key={person.id} 
      person={person.name} 
      number={person.number} 
      handleClick={handleClick(person.id, person.name)} 
      />
    )}
    </>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
          name: <input 
          value={props.newName} 
          onChange={props.handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={props.newNumber} 
          onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = (props) => {
  return (
    <div>
    filter shown with 
    <input 
    value={props.newFilter}
    onChange={props.handleFilterChange}
    />
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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
      <Filter 
      newFilter={newFilter}
      handleFilterChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm 
      addPerson={addPerson} 
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      newName={newName}
      newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <div>
        <PersonsRenderer persons={persons} newFilter={newFilter} setPersons={setPersons}/> 
      </div>
    </div>
  )
}

export default App