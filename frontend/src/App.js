import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Policy from './pages/Policy';
import Notfound from './pages/Notfound';
//import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { AdminMovieDashboard } from './pages/MovieManagement/AdminMovieDashboard';
import AddMovies from './pages/MovieManagement/AddMovies';
import { CreateMovieCategory } from './pages/MovieManagement/CreateMovieCategory';
import { Movies } from './pages/Users/Movies';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/movies' element={<Movies />} />
      <Route path="/about" element={<About />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="*" element={<Notfound />} />
      <Route path="/adminmoviedashboard" element={<AdminMovieDashboard />} />
      <Route path="/adminmoviedashboard/moviemanagement/add-movie" element={<AddMovies />} />
      <Route path="/adminmoviedashboard/moviemanagement/create-category" element={<CreateMovieCategory />} />
    </Routes>
      
    </>
  );
}

export default App;
