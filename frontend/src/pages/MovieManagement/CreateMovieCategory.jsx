import React from 'react'
import AdminMovieMenu from '../../components/Layout/AdminMovieMenu'
export const CreateMovieCategory = () => {
  return (
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMovieMenu />
        </div>
        <div className='col-md-9'>
        <h4>Create Movie Category</h4>
        </div>
    </div>
    </div>
  )
}
