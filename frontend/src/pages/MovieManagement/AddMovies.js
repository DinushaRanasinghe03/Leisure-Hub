import React, { useState, useEffect } from 'react';
import AdminMovieMenu from '../../components/Layout/AdminMovieMenu';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import LayoutAdmin from './../../components/Layout/LayoutAdmin';

const { Option } = Select;

const AddMovies = () => {
  const [moviecategories, setMovieCategories] = useState([]);
  const [name, setName] = useState('');
  const [genre, setMovieCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [director, setDirector] = useState('');
  const [producer, setProducer] = useState('');
  const [music, setMusic] = useState('');
  const [release_date, setReleasedate] = useState('');
  const [description, setDescription] = useState('');
  const [poster_image, setPosterimage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // get all category
  const getAllMovieCategory = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/moviecategory/get-moviecategory');
      if (data?.success) {
        setMovieCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something wrong in getting category');
    }
  };

  useEffect(() => {
    getAllMovieCategory();
  }, []);

  // create movie function
  const handleCreate = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!genre) errors.genre = 'Genre is required';
    if (!language) errors.language = 'Language is required';
    if (!director) errors.director = 'Director is required';
    if (!producer) errors.producer = 'Producer is required';
    if (!music) errors.music = 'Music is required';
    if (!release_date) errors.release_date = 'Release Date is required';
    if (!description) errors.description = 'Description is required';
    if (!poster_image) errors.poster_image = 'Poster Image is required';

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const movieData = new FormData();
      movieData.append('name', name);
      movieData.append('genre', genre);
      movieData.append('language', language);
      movieData.append('director', director);
      movieData.append('producer', producer);
      movieData.append('music', music);
      movieData.append('release_date', release_date);
      movieData.append('description', description);
      movieData.append('poster_image', poster_image);

      const { data } = await axios.post('http://localhost:8080/api/v1/movies/create-movie', movieData);

      if (data?.success) {
        toast.success('Product created successfully');
        navigate('/adminmoviedashboard/moviemanagement/movie');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <LayoutAdmin>
    <div className="container-fluid m-4 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMovieMenu />
        </div>
        <div className="col-md-9">
          <h4 className="text-center"><legend>Add movies</legend></h4>
          <div className="m-1 w-75">
            <div className="mb-3">
              <label>Movie Title :</label>
              <input
                type="text"
                value={name}
                placeholder="Movie title"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>

            <label>Movie Genre :</label>
            <Select
              variant={false}
              placeholder="Select a Genre"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setMovieCategory(value);
              }}
            >
              {moviecategories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            {errors.genre && <div className="text-danger">{errors.genre}</div>}
            
            <label>Language :</label>
            <div className="mb-3">
              <input
                type="text"
                value={language}
                placeholder="Movie Language"
                className="form-control"
                onChange={(e) => {
                  const value = e.target.value;
                  // Check if the input contains only letters
                  if (/^[A-Za-z\s]*$/.test(value)) {
                    setLanguage(value); // Set the value if it contains only letters
                    setErrors({}); // Clear any previous errors
                 } else {
                    setErrors({ language: 'Only strings are allowed' }); // Set error if input contains other characters
                  }
                }}
              />
              {errors.language && <div className="text-danger">{errors.language}</div>}
            </div>
            
            <label>Directed By :</label>
            <div className="mb-3">
              <input
                type="text"
                value={director}
                placeholder="Film Director"
                className="form-control"
                onChange={(e) => {
                  const value = e.target.value;
                  // Check if the input contains only letters, spaces, and periods
                  if (/^[A-Za-z\s.,]*$/.test(value)) {
                    setDirector(value); // Set the value if it contains only letters, spaces, and periods
                    setErrors({}); // Clear any previous errors
                 } else {
                    setErrors({ director: 'Only strings are allowed' }); // Set error if input contains other characters
                  }
                }}
              />
              {errors.director && <div className="text-danger">{errors.director}</div>}
            </div>
            
            <label>Produced By :</label>
            <div className="mb-3">
              <input
                type="text"
                value={producer}
                placeholder="Film Producer"
                className="form-control"
                onChange={(e) => {
                  const value = e.target.value;
                  // Check if the input contains only letters, spaces, and periods
                  if (/^[A-Za-z\s.,]*$/.test(value)) {
                    setProducer(value); // Set the value if it contains only letters, spaces, and periods
                    setErrors({}); // Clear any previous errors
                 } else {
                    setErrors({ producer: 'Only strings are allowed' }); // Set error if input contains other characters
                  }
                }}
              />
              {errors.producer && <div className="text-danger">{errors.producer}</div>}
            </div>

            <label>Music Composed By :</label>
            <div className="mb-3">
              <input
                type="text"
                value={music}
                placeholder="Music by"
                className="form-control"
                onChange={(e) =>  {
                  const value = e.target.value;
                  // Check if the input contains only letters, spaces, and periods
                  if (/^[A-Za-z\s.,]*$/.test(value)) {
                    setMusic(value); // Set the value if it contains only letters, spaces, and periods
                    setErrors({}); // Clear any previous errors
                 } else {
                    setErrors({ music: 'Only strings are allowed' }); // Set error if input contains other characters
                  }
                }}
              />
              {errors.music && <div className="text-danger">{errors.music}</div>}
            </div>

            <label>Movie Release Date :</label>
            <div className="mb-3">
              <input
                type="date"
                value={release_date}
                placeholder="Release date"
                className="form-control"
                onChange={(e) => setReleasedate(e.target.value)}
              />
              {errors.release_date && <div className="text-danger">{errors.release_date}</div>}
            </div>

            <label>Movie Description :</label>
            <div className="mb-3">
              <textarea
                value={description}
                placeholder="Description"
                className="form-control"
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && <div className="text-danger">{errors.description}</div>}
            </div>

            <label>Poster Image :</label>
            <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12">
              {poster_image ? poster_image.name : 'Upload poster image'}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => {
                  const file = e.target.files[0];
                  // Validate if file is an image
                     if (!file || !file.type.startsWith('image/')) {
                          setPosterimage(null); // Clear poster image
                          setErrors({ poster_image: 'Only image files are allowed' });
                      return;
                      }
                  // If it's an image, set poster image
                    setPosterimage(file);
                   }}
                  hidden
                 />
            </label>
            {errors.poster_image && <div className="text-danger">{errors.poster_image}</div>}
            </div>

            <div className="mb-3">
              {poster_image && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(poster_image)}
                    alt="poster_image"
                    height={'200px'}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
          <br/>
            <div className="mb-3 d-flex justify-content-center">
              <button className="btn btn-primary" onClick={handleCreate}>
                Add Movie
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
    </LayoutAdmin>
  );
};

export default AddMovies;



