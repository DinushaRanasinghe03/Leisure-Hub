import React from 'react'
import AdminMovieMenu from '../../components/Layout/AdminMovieMenu'

export const AdminMovieDashboard = () => {
  return (
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMovieMenu />
        </div>
        <div className='col-md-9'>Content</div>
    </div>
</div>
  )
}
