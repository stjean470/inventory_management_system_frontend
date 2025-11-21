import {React, useState} from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [isOpen, setIsOpen] = useState(true)

    const toggleNavbar = () => {
        setIsOpen(!isOpen)
    }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">IMS</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNavbar}
          aria-controls="navbarNavAltMarkup" 
          aria-expanded={isOpen} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to='/' aria-current="page">Home</Link>
            <Link className="nav-link" to='/warehouseUpdate'>Add Warehouse</Link>
            <Link className="nav-link" to='/items'>View Items</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header