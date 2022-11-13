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
      <img src={country.flags.png} alt="flag" width="200" height="150"></img>
    </div>
  )
}

const CountriesRenderer = ({ countries, filter }) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter))
  
  if (filteredCountries.length === countries.length || filteredCountries.length === 0) {
    return
  }
  else if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (filteredCountries.length > 1 && filteredCountries.length < 11) {
    return filteredCountries.map(country => <div key={country.name.common}>{country.name.common}</div>)
  }
  else {
    return <Country country={filteredCountries[0]} />
  }
}

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })

  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <Filter 
      newFilter={newFilter}
      handleFilterChange={handleFilterChange}/>
      <CountriesRenderer 
      countries={countries}
      filter={newFilter}/>
    </div>
  )
}

export default App;
