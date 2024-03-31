import React,{useState,useEffect} from 'react'
import AdminMovieMenu from '../../components/Layout/AdminMovieMenu'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AdminMovieDashboard = () => {
  const[movies,setMovies] = useState([]);

    //get all movies
    const getAllMovies = async () => {
        try {
            const {data} = await axios.get("http://localhost:8080/api/v1/movies/get-movie");
            setMovies(data.movies)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllMovies();
    })

    return (
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMovieMenu />
            </div>
            <div className='col-md-9'>
              <h2 className='text-center'>All Movie List</h2>
              {/* Modification: Added row and row-cols-md-3 classes */}
              <div className='row row-cols-1 row-cols-md-3 g-4'>
                {movies?.map(p => (
                  <div key={p._id} className="col">
                    
                      <div className="card m-2" style={{ width: '18rem' }}>
                        <img src={`http://localhost:8080/api/v1/movies/movie-posterimage/${p._id}`} className="card-img-top" alt={p.name} />
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">{p.language}</p>
                        </div>
                      </div>
                    
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      );
}

export default AdminMovieDashboard