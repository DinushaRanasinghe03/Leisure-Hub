import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout/Layout';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

import badminton from './../assets/badminton.jpg';
import cricket from './../assets/cricket.jpg';
import pooling from './../assets/pooling.jpg';
import pottery from './../assets/pottery.jpg';
import tabletennis from './../assets/tabletennis.jpg';
import pop from './../assets/pop.jpg';
import sport from './../assets/sport.jpg';
import popcorn from './../assets/popcorn.jpg'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  // Get all movies
  const getAllMovies = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/movies/get-movie");
      setMovies(data.movies);
    } catch (error) {
      console.log(error);
      // Handle error using toast
      toast.error("Something went wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <Layout title={"Home Page"}>
    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval={10000}>
      <img src={popcorn} className="d-block w-100" alt="..." style={{ maxHeight: "600px" }} />
    </div>
    <div className="carousel-item" data-bs-interval={2000}>
      <img src={sport} className="d-block w-100" alt="..." style={{ maxHeight: "600px" }} />
    </div>
    <div className="carousel-item">
      <img src={pop} className="d-block w-100" alt="..." style={{ maxHeight: "600px" }} />
    </div>
    </div>
  
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
    </button>
  
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
    </button>
    </div>

    <div className="container-fluid m-2 p-4">
     <div className="text-center">
      <div className="box">
       <p className="box-text">
       Welcome to LEISUREHUB, your ultimate destination for a perfect blend of cinematic delight and 
       exhilarating activities!Immerse yourself in our captivating world of cinematic wonder, where 
       the silver screen comes alive with the latest releases spanning every genre imaginable.Engage in 
       adrenaline-pumping battles with friends in our state-of-the-art laser tag arena, test your skills 
       at our arcade, or embark on immersive virtual reality adventures that transport you to fantastical
        realms.Becoming a member unlocks exclusive perks like priority access to activities and personalized 
        recommendations.Join us at LEISUREHUB for an extraordinary entertainment and adventure experience!
       </p>
      </div>
     </div>
    </div>


    <div className='container-fluid m-2 p-4'>
      <div className='text-center'>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>Movies</h1>
          <div className='row row-cols-2 row-cols-md-5'>
            {movies.slice(0, 5).map(movie => (
              <div key={movie._id} className="col mb-4">
                <div className='card' style={{ width: "100%" }}>
                  <img src={`http://localhost:8080/api/v1/movies/movie-posterimage/${movie._id}`} className="card-img-top" alt={movie.name} />
                  <div className="card-body">
                    <h5 className="card-title">{movie.name}</h5> 
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

     <div className='container-fluid m-2 p-4'>
     <div className='text-center'>
     <h1 style={{ fontSize: "24px", fontWeight: "bold",textAlign: "center", marginBottom: "20px" }}>Games & Activities</h1>
     <div className='row row-cols-2 row-cols-md-5'>
      <div className="col mb-4">
        <div className='card' style={{ width: "100%", height: "100%" }}>
          <img src={badminton} className="card-img-top" alt="Game 1" style={{ objectFit: "cover", height: "200px" }} />
          <div className="card-body" style={{ height: "100px", overflow: "hidden" }}>
            <h5 className="card-title">Badminton</h5>
          </div>
        </div>
      </div>

      <div className="col mb-4">
        <div className='card' style={{ width: "100%", height: "100%" }}>
          <img src={cricket} className="card-img-top" alt="Game 2" style={{ objectFit: "cover", height: "200px" }} />
          <div className="card-body" style={{ height: "100px", overflow: "hidden" }}>
            <h5 className="card-title">Cricket</h5>
          </div>
        </div>
      </div>

      <div className="col mb-4">
        <div className='card' style={{ width: "100%", height: "100%" }}>
          <img src={pooling} className="card-img-top" alt="Game 2" style={{ objectFit: "cover", height: "200px" }} />
          <div className="card-body" style={{ height: "100px", overflow: "hidden" }}>
            <h5 className="card-title">Pooling</h5>
          </div>
        </div>
      </div>

      <div className="col mb-4">
        <div className='card' style={{ width: "100%", height: "100%" }}>
          <img src={pottery} className="card-img-top" alt="Game 2" style={{ objectFit: "cover", height: "200px" }} />
          <div className="card-body" style={{ height: "100px", overflow: "hidden" }}>
            <h5 className="card-title">Pottery</h5>
          </div>
        </div>
      </div>

      <div className="col mb-4">
        <div className='card' style={{ width: "100%", height: "100%" }}>
          <img src={tabletennis} className="card-img-top" alt="Game 2" style={{ objectFit: "cover", height: "200px" }} />
          <div className="card-body" style={{ height: "100px", overflow: "hidden" }}>
            <h5 className="card-title">Table Tennis</h5>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</div>

  <div className="container-fluid m-2 p-4">
  <div className="text-center">
    <div className="box">
      <p className="box-text2">
        <b>Register Now As a memeber</b><br/>
        While you don't have to be a registered member to buy a movie ticket,
         registered members can both enjoy movies and play games & activities.
      </p>
      <button className="register-button" onClick={() => navigate(`/register`)}>Register Now</button>
    </div>
  </div>
  </div>
      <Toaster />
    </Layout>
  );
};

export default HomePage;
