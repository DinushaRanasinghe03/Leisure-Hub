import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const MovieDetails = () => {
  const params = useParams()
  const [movie, setMovie] = useState({})
  
  //initial details
  useEffect(()=>{
    if(params?.slug) getMovie();
  },[params?.slug]);

  
  //get movie
  const getMovie = async () => {
    try {
       const {data} = await axios.get(`http://localhost:8080/api/v1/movies/get-movie/${params.slug}`) 
       setMovie(data?.movie);
       
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <Layout>
        <div className='row container mt-5'>
            <div className='col-md-6'>
            <img src={`http://localhost:8080/api/v1/movies/movie-posterimage/${movie._id}`} 
            className="card-img-top" 
            alt={movie.name}
            height="450"
            width={"250px"} />
            </div>
            <div className='col-md-6'>
                <h2 className='text-center'>Movie Details</h2>
                <p><b>Movie Title : </b>{movie.name}</p>
                <p><b>Language : </b>{movie.language}</p>
                <p><b>Director : </b>{movie.director}</p>
                <p><b>Producer : </b>{movie.producer}</p>
                <p><b>Music Composer : </b>{movie.music}</p>
                <p><b>Release Date : </b>{movie.release_date}</p>
                <p><b>Description : </b>{movie.description}</p>

                <center>
                <button class="btn btn-primary ms-3">BOOK NOW</button>
                <button class="btn btn-secondary ms-3">Reviews</button>
                </center>
            </div>
        </div>
        {/*<div className='row'>Similar Movies</div>*/}
        <br />
    </Layout>
  )
}

export default MovieDetails