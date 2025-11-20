import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addItem, getItemById, updateItem } from '../services/apiFunctions'

const ItemForm = () => {
    const [itemName, setItemName] = useState('')
    const [sku, setSku] = useState('') 
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [storage_location, setStorage_Location] = useState('')
    const {id} = useParams()
    const navigator = useNavigate()

    const addOrupdateItem = (e) => {
        e.preventDefault()
        if (id) {
            const item = {
                itemName: itemName,
                sku: sku,
                description: description,
                quantity: quantity,
                storage_location: storage_location
            }
            updateItem(id, item).then((response) => {
                console.log(response.data)
                navigator('/items')
            })

        }else {
            const item = {
                itemName: itemName,
                sku: sku,
                description: description,
                quantity: quantity,
                storage_location: storage_location
            }
            addItem(item).then((response) => {
                console.log(response.data)
                navigator('/items')
            })

        }
    }

    useEffect(() => {
        if(id) {
            getItemById(id).then((response) => {
                const item = response.data
                console.log(item)
                setItemName(item.itemName)
                setSku(item.sku)
                setDescription(item.description)
                setQuantity(item.quantity)
                setStorage_Location(item.storage_location)
            })
        }
    }, [])
  return (
    <div className='container'>
        <div className='row'>
            <div className='card'>
                {
                    id ? (<h1 className='text-center'>Update Item</h1>) :
                    (<h1 className='text-center'>Add Item</h1>)
                }
                
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
                    {
                        id ? (<button type='submit' className='btn btn-primary' onClick={addOrupdateItem}>Update</button>) :
                        (<button type='submit' className='btn btn-primary' onClick={addOrupdateItem}>Create</button>)
                    }
                    
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default ItemForm