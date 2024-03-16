import React from 'react'
import {NavLink,Link} from "react-router-dom"

const Header = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
       <div className="container-fluid">
        <button 
            className="navbar-toggler" 
            type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarTogglerDemo01" 
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false" 
            aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

            <Link 
                to ="/" 
                className="navbar-brand" 
                >LEISUREHUB
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <li className="nav-item">
            <NavLink 
                to ="/" 
                className="nav-link" 
                >Home
            </NavLink>
            </li>

            <li className="nav-item">
            <NavLink 
                to ="/movies" 
                className="nav-link" 
                >Movies
            </NavLink>
            </li>

            <li className="nav-item">
            <NavLink 
                to ="/showtime" 
                className="nav-link" 
                >Show Time & Scheduling
            </NavLink>
            </li>

            <li className="nav-item">
            <NavLink 
                to ="/booking" 
                className="nav-link" 
                >Booking
            </NavLink>
            </li>

            <li className="nav-item">
            <NavLink 
                to ="/games" 
                className="nav-link" 
                >Games & Activities
            </NavLink>
            </li>

            <li className="nav-item">
            <NavLink 
                to ="/facilities" 
                className="nav-link" 
                >Facilities
            </NavLink>
            </li>

            <li className="nav-item">
            <NavLink 
                to ="/membership" 
                className="nav-link" 
                >Memberships
            </NavLink>
            </li>

            <li className="nav-item">
            <NavLink 
                to ="/login" 
                className="nav-link" 
                >Login
            </NavLink>
            </li>
            </ul>
        </div>
    </div>
</nav>

    </>
  )
}

export default Header