import React from 'react'
import AdminMovieMenu from '../../components/Layout/AdminMovieMenu'

const AddMovies = () => {
  return (
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMovieMenu />
        </div>
        <div className='col-md-9'>
        <h4>Add movies</h4>
        </div>
    </div>
    </div>
  )
}

export default AddMovies