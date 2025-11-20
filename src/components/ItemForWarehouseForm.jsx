import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { addItem, getWarehouseById } from '../services/apiFunctions'

const ItemForWarehouseForm = () => {
    const [itemName, setItemName] = useState('')
    const [sku, setSku] = useState('') 
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [storage_location, setStorage_Location] = useState('')
    const [warehouse, setWarehouse] = useState({}) //this warehouse will be used to pair an Item to a specific warehouse

    const {id} = useParams()

    const getWarehouse = (id) => {
        getWarehouseById(id).then((response) => {
            const retrievedWarehouse = response.data
            setWarehouse(retrievedWarehouse)
        })
    }

    const addItemToWarehouse = (e) => {
        e.preventDefault()
        const item = {
            itemName: itemName,
            sku: sku,
            description: description,
            quantity: quantity,
            storage_location: storage_location,
            warehouses: [warehouse]
        }

        addItem(item).then((response) => console.log(response.data))
        
    } 

    useEffect(() => {
        if (id) {
            getWarehouse(id)
        }
    })
  return (
    <div className='container'>
        <div className='row'>
            <div className='card'>
                <h1 className='text-center'>Add Item For Warehouse</h1>
                <form>
                    <div className='form-group'>
                        <label className='form-label'>Item Name</label>
                        <input 
                            type='text'
                            className='form-control'
                            value={itemName}
                            required
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>SKU</label>
                        <input 
                            type='text'
                            className='form-control'
                            value={sku}
                            required
                            onChange={(e) => setSku(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>Description</label>
                        <textarea
                            className='form-control'
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className='form-group'>
                        <label className='form-label'>Quantity</label>
                        <input 
                            type='number'
                            className='form-control'
                            value={quantity}
                            required
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>Item Storage Location</label>
                        <input 
                            type='text'
                            className='form-control'
                            value={storage_location}
                            required
                            onChange={(e) => setStorage_Location(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-primary' onClick={addItemToWarehouse}>Create</button>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default ItemForWarehouseForm