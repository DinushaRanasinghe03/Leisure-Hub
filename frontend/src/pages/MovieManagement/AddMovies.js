import React,{useState,useEffect} from 'react'
import AdminMovieMenu from '../../components/Layout/AdminMovieMenu'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom'

const {Option} = Select

const AddMovies = () => {
  const [moviecategories, setMovieCategories] = useState([])
  const[name,setName] = useState("")
  const[genre,setMovieCategory] = useState("")
  const[language,setLanguage] = useState("")
  const[director,setDirector] = useState("")
  const[producer,setProducer] = useState("")
  const[music,setMusic] = useState("")
  const[release_date,setReleasedate] = useState("")
  const[description,setDescription] = useState("")
  const[poster_image,setPosterimage] = useState("")
  const navigate = useNavigate();

  //get all category
  const getAllMovieCategory = async() => {
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/moviecategory/get-moviecategory')
      if(data?.success){
        setMovieCategories(data?.category )
      }
    } catch (error) {
      console.log(error)
      toast.error('Something wrong in getting category')
    }
  }

  useEffect(()=>{
    getAllMovieCategory();
  },[])




  //create movie function
  const handleCreate = async (e) => {
    e.preventDefault()
    
    try {
      const movieData = new FormData()
      movieData.append("name",name)
      movieData.append("genre",genre)
      movieData.append("language",language)
      movieData.append("director",director)
      movieData.append("producer",producer)
      movieData.append("music",music)
      movieData.append("release_date",release_date)
      movieData.append("description",description)
      movieData.append("poster_image",poster_image)

      const {data} = await axios.post("http://localhost:8080/api/v1/movies/create-movie", movieData)

      if(data?.success){
        //**********************
        toast.success("product created successfully")
        navigate('/adminmoviedashboard/moviemanagement/movie')
       
      }else{
        toast.error("something went wrong")
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
    }
  }


  return (
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMovieMenu />
        </div>
        <div className='col-md-9'>
        <h4 className='text-center'>Add movies</h4>
        <div className='m-1 w-75'>

        <div className='mb-3'>
              <input
              type="text"
              value={name}
              placeholder='Movie title'
              className='form-control'
              onChange={(e) => setName(e.target.value)}
              />            
            </div>

          <Select variant={false} 
          placeholder="select a Genre"
          size="large" 
          showSearch
          className='form-select mb-3'
          onChange={(value) => {setMovieCategory(value)}} >
            {moviecategories?.map(c => (
              <Option key={c._id} value={c._id}>{c.name}</Option>
            ))}
          </Select>

         <div className='mb-3'>
              <input
              type="text"
              value={language}
              placeholder='Movie Language'
              className='form-control'
              onChange={(e) => setLanguage(e.target.value)}
              />            
            </div>

            <div className='mb-3'>
              <input
              type="text"
              value={director}
              placeholder='Film Director'
              className='form-control'
              onChange={(e) => setDirector(e.target.value)}
              />            
            </div>

            <div className='mb-3'>
              <input
              type="text"
              value={producer}
              placeholder='Film Producer'
              className='form-control'
              onChange={(e) => setProducer(e.target.value)}
              />            
            </div>

            <div className='mb-3'>
              <input
              type="text"
              value={music}
              placeholder='Music by'
              className='form-control'
              onChange={(e) => setMusic(e.target.value)}
              />            
            </div>

            <div className='mb-3'>
              <input
              type="date"
              value={release_date}
              placeholder='Release date'
              className='form-control'
              onChange={(e) => setReleasedate(e.target.value)}
              />            
            </div>

            <div className='mb-3'>
            <textarea
            value={description}
            placeholder='Description'
            className='form-control'
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
             />
            </div>

            <div className='mb-3'>
  <label className='btn btn-outline-secondary col-md-12'>
    {poster_image ? poster_image.name : "Upload poster image"}
    <input
      type="file"
      name="photo"
      accept="image/*"
      onChange={(e) => setPosterimage(e.target.files[0])}
      hidden
    />
  </label>
</div>

<div className='mb-3'>
  {poster_image && (
    <div className='text-center'>
      <img
        src={URL.createObjectURL(poster_image)}
        alt="poster_image"
        height={"200px"}
        className='img img-responsive'
      />
    </div>
  )}
</div>

  
            <div className='mb-3'>
              <button className='btn btn-primary' onClick={handleCreate}>Add Movie</button>
            </div>

        </div>
        </div>
    </div>
    <Toaster />
    </div>
  )
}

export default AddMovies