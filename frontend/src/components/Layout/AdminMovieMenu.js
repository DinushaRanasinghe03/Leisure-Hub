import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMovieMenu = () => {
  return (
    <>
    <div className='text-center'>
    <div className="list-group">
    <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>Movie Management Panel</h1>
       <NavLink to="/adminmoviedashboard/moviemanagement/create-category" className="list-group-item list-group-item-action">Movie Genres</NavLink>
       <NavLink to="/adminmoviedashboard/moviemanagement/add-movie" className="list-group-item list-group-item-action">Add Movies</NavLink>
       <NavLink to="/adminmoviedashboard/moviemanagement/movie" className="list-group-item list-group-item-action">Movie List</NavLink>
       <NavLink to="/adminmoviedashboard/moviemanagement/add-movieschedule" className="list-group-item list-group-item-action">Schedule Show Times</NavLink>
       <NavLink to="/adminmoviedashboard/moviemanagement/movieschedule" className="list-group-item list-group-item-action">Showtimes Schedules</NavLink>
    </div>
    </div>
    </>
  )
}

export default AdminMovieMenu