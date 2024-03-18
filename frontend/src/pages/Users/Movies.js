import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import {Checkbox} from 'antd'
import SearchInput from '../../components/Form/SearchInput'
import { useNavigate } from 'react-router-dom'
//import { language } from '../../components/language'

export const Movies = () => {
  const navigate = useNavigate();
  const [movies,setMovies] = useState([])
  const [moviecategories,setMovieCategories] = useState([])
  const [checked,setChecked] = useState([])
  //const [radio,setRadio] = useState([])

    //get all category
    const getAllMovieCategory = async() => {
      try {
        const {data} = await axios.get('http://localhost:8080/api/v1/moviecategory/get-moviecategory')
        if(data?.success){
          setMovieCategories(data?.category )
        }
      } catch (error) {
        console.log(error)
        
      }
    }

    useEffect(()=>{
      getAllMovieCategory();
    },[])
  
  

  //get all movies
  const getAllMovies = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/movies/get-movie");
      setMovies(data.movies)
    } catch (error) {
      console.log(error)
    }
  };

    //filter by genre
    const handleFilter = (value, id) => {
      let all = [...checked];
      if(value){
        all.push(id);
      }
      setChecked(all);
    }

  useEffect(() => {
    if(!checked.length)
    getAllMovies();
  },[checked.length]);

  useEffect(() => {
    if(!checked.length)
    filterMovie();
  },[checked]);

 //get filtered movie
 const filterMovie = async () => {
  try {
    const {data} = await axios.post(`http://localhost:8080/api/v1/movies/movie-filters`,{checked})
    setMovies(data?.movies)
  } catch (error) {
    console.log(error)
  }
 }

 return (
  <Layout title={"Movies"}>
    <br />
    <SearchInput />
    <div className='row mt-3'>
      <div className='col-md-2'>
        <h4 className='text-center'>Filter by genre</h4>
        <div className='d-flex flex-column'>
          {moviecategories?.map((c)=>(
            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked,c._id)}>
              {c.name}
            </Checkbox>
          ))}
        </div>   
        <br />
      </div>
      <div className='col-md-9'>
        <h2 className='text-center'>Now Showing</h2>
        {/* Modification: Moved the row div outside of the map function */}
        <div className='row row-cols-1 row-cols-md-3 g-4'>
          {movies?.map(p => (
            <div key={p._id} className="col">
              <div className="card">
                <img src={`http://localhost:8080/api/v1/movies/movie-posterimage/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.language}</p>
                  <div className='d-flex justify-content-center'>
                    <button className='btn btn-primary ms-3' 
                    onClick={() => navigate(`/moviedetails/${p.slug}`)}
                    >
                      More Details</button>
                    <button className='btn btn-secondary ms-3'>Reviews</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <br/>
  </Layout>
)}
