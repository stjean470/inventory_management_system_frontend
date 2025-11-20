import React, { useEffect, useState } from 'react'
import { deleteItemById, getAllItems } from '../services/apiFunctions'
import { useNavigate } from 'react-router-dom'
const Items = () => {
    const [items, setItems] = useState([])

    const navigator = useNavigate()

    const getItems = () => {
        getAllItems().then((response) => {
            setItems(response.data)
        }).catch(error => console.log(error))
    }

    const addAnItem = () => {
        navigator(`/item`)
    }

    const updateItem = (id) => {
        navigator(`/updateItem/${id}`)
    }
    
    const deleteItem = (id) => {
        deleteItemById(id).then(() => {
            setItems((prevItems) => prevItems.filter(item => item.id !== item.id))
            getItems()
        })
    }
    useEffect(() => {
        getItems()
    }, [])
  return (
    <div className='container'>
        <h1 className='text-center mb-3'>All Items</h1>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>SKU</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Storage Location</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.itemName}</td>
                                <td>{item.sku}</td>
                                <td>{item.description}</td>
                                <td>{item.quantity}</td>
                                <td>{item.storage_location}</td>
                                <td>
                                    <button className='btn btn-primary'>View</button>
                                    <button className='btn btn-success' onClick={() => updateItem(item.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => deleteItem(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <button className='btn btn-primary' onClick={addAnItem}>Add Item</button>

    </div>
  )
}

export default Items