import React, { useEffect, useState } from 'react'
import countries from '../util/countries'
import { addWarehouse, getWarehouseById } from '../services/apiFunctions'
import states from '../util/states'
import { useParams } from 'react-router-dom'

const WarehouseComponent = () => {
  const [name, setName] = useState('')
  const [max_capacity, setMax_Capacity] = useState(0) 
  const [state, setState] = useState('')
  const [location, setLocation] = useState({
      city: '',
      country: ''
  })
  const [isStatePresent, setIsStatePresent] = useState(false)

  const {id} = useParams()

  const createWarehouse = () => {
    if (state != null || state !== '') {
      location.state = state
    }
    const warehouse = {
      name: name,
      max_capacity: max_capacity,
      location: location
    }
    addWarehouse(warehouse).then(data => console.log(data + " was successfully added"))
    .catch(error => console.log(error))
  }

  useEffect(() => {
    if(id) {
      console.log(id)
      getWarehouseById(id).then((response) => {
        console.log(response.data)
      }).catch(error => console.log(error))
    }
    
  }, [id])
  return (
    <div className='container'>
      <h1 className='text-center mb-3'>Add Warehouse</h1>

      <div className='row'>
        <form>
          <div className='form-group'>
            <label className='form-label'>Name</label>
            <input 
              type='text'
              className='form-control'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label className='form-label'>Name</label>
            <input 
              type='number'
              className='form-control'
              value={max_capacity}
              required
              onChange={(e) => setMax_Capacity(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label className='form-label'>City</label>
            <input 
              type='text'
              className='form-control'
              value={location.city}
              required
              onChange={(e) => setLocation({...location, city: e.target.value})}
            />
          </div>

          {location.country === 'United States' && (
            <div className='form-group'>
            <label className='form-label'>State</label>
            <select 
              className='form-select'
              value={state}
              required
              onChange={(e) => setState(e.target.value)}>
              <option value={""}>Select a State</option>
              {
                states.map((state) => {
                  return (
                    <option key={state.code} value={state.name}>{`${state.name}`}</option>
                  )
                })
              }
            </select>
          </div>
          )}
          
          
            
          <div className='form-group'>
            <label className='form-label'>Country</label>
            <select 
              className='form-select'
              value={location.country}
              required
              onChange={(e) => {
                if(e.target.value === 'United States') {
                  setIsStatePresent(!isStatePresent)
                }
                setLocation({...location, country: e.target.value}
              )}}>
              <option value={""}>Select a Country</option>
              {
                countries.map((country) => {
                  return (
                    <option key={country.code} value={country.name}>{`${country.name}`}</option>
                  )
                })
              }
            </select>
            {!isStatePresent && (
              <small className='form-text text-muted'>If you want your Warehouse in the US, you can do that, you will also be prompted to put a State</small> 
            )}
          </div>
          <button type='submit' onClick={createWarehouse}>Add</button>
        </form>
      </div>
    </div>
  )
}

export default WarehouseComponent