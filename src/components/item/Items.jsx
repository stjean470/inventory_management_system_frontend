import React, { useEffect, useState } from 'react'
import { deleteItemById, getAllItems } from '../../services/apiFunctions'
import { useNavigate } from 'react-router-dom'
import { FiEdit3 } from "react-icons/fi";
import { IoIosTrash } from "react-icons/io";
import { GrView } from "react-icons/gr";
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

    const viewItem = (id) => {
        navigator(`/item-info/${id}`)
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
                                    <GrView style={{cursor: 'pointer', margin: '5px'}} onClick={() => viewItem(item.id)}/>
                                    <FiEdit3 style={{cursor: 'pointer', margin: '5px'}} onClick={() => updateItem(item.id)}/>
                                    <IoIosTrash style={{cursor: 'pointer', margin: '5px'}} onClick={() => deleteItem(item.id)}/>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <div className='row'>
            <button className='btn btn-primary' onClick={addAnItem}>Add Item</button>
        </div>
        

    </div>
  )
}

export default Items