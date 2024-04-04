import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Notfound from './pages/Notfound';
//import { Toaster } from 'react-hot-toast';
//import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  AdminMovieDashboard  from './pages/MovieManagement/AdminMovieDashboard';
import AddMovies from './pages/MovieManagement/AddMovies';
import  CreateMovieCategory  from './pages/MovieManagement/CreateMovieCategory';
import { Movies } from './pages/Users/Movies';
import Movie from './pages/MovieManagement/Movie';
import UpdateMovie from './pages/MovieManagement/UpdateMovie';
import AddMovieSchedule from './pages/MovieManagement/AddMovieSchedule';
import ShowtimeSchedule from './pages/MovieManagement/ShowtimeSchedule';
import SearchMovie from './pages/SearchMovie';
import MovieDetails from './pages/MovieDetails';
import ShowtimeScheduling from './pages/Users/ShowtimeScheduling';



function App() {
  return (
    <>
    <Routes>
    
      <Route path='/' element={<HomePage />} />
      <Route path='/search' element={<SearchMovie />} />
      <Route path='/moviedetails/:slug' element={<MovieDetails />} />
      <Route path='/movies' element={<Movies />} />
      <Route path='/schedules' element={<ShowtimeScheduling />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Notfound />} />
      <Route path="/adminmoviedashboard" element={<AdminMovieDashboard />} />
      <Route path="/adminmoviedashboard/moviemanagement/add-movie" element={<AddMovies />} />
      <Route path="/adminmoviedashboard/moviemanagement/create-category" element={<CreateMovieCategory />} />
      <Route path="/adminmoviedashboard/moviemanagement/movie" element={<Movie />} />
      <Route path="/adminmoviedashboard/moviemanagement/movie/:slug" element={<UpdateMovie />} />
      <Route path="/adminmoviedashboard/moviemanagement/add-movieschedule" element={<AddMovieSchedule />} />
      <Route path="/adminmoviedashboard/moviemanagement/movieschedule" element={<ShowtimeSchedule />} />
      
    </Routes>
      
    </>
  );
}

export default App;
