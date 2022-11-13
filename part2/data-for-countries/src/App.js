import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      find countries
      <input 
      value={newFilter}
      onChange={handleFilterChange}
      />
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2><b>{country.name.common}</b></h2>
      <div>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
      </div>
      <h3><b>languages: </b></h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag" width="220" height="150"></img>
    </div>
  )
}

const ListOfCountries = ({ countries, toShow, setToShow }) => {

  const handleClick = country => (event) => {
    if (toShow === country.name.common) {
      setToShow('')
    }
    else {
      setToShow(country.name.common)
    }
  }

  return(
    <div>
      {countries.map(country => 
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={handleClick(country)}>show</button>
        {toShow === country.name.common && <Country country={country} />}
      </div>)}
    </div>
  )
}

const Display = ({ countries, newFilter, toShow, setToShow }) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newFilter))
  
  if (filteredCountries.length === countries.length || filteredCountries.length === 0) {
    return
  }
  else if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (filteredCountries.length > 1 && filteredCountries.length < 11) {
    return <ListOfCountries countries={filteredCountries} toShow={toShow} setToShow={setToShow}/>
  }
  else {
    return <Country country={filteredCountries[0]} />
  }
}

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [toShow, setToShow] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })

  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
    setToShow('')
  }

  return (
    <div>
      <Filter 
      newFilter={newFilter}
      handleFilterChange={handleFilterChange}/>
      <Display
      countries={countries}
      newFilter={newFilter}
      toShow={toShow}
      setToShow={setToShow}/>
    </div>
  )
}

export default App;
