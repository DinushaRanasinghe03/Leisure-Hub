import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Base from "./pages/Base";
import MovieList from "./pages/MovieList";
import TicketBooking from "./pages/TicketBooking";
import { Movies } from "./pages/Users/Movies";
import Notfound from "./pages/Notfound";
import Policy from "./pages/Policy";
import { CreateMovieCategory } from "./pages/MovieManagement/CreateMovieCategory";
import { AdminMovieDashboard } from "./pages/MovieManagement/AdminMovieDashboard";
import About from "./pages/About";
import AddMovies from './pages/MovieManagement/AddMovies'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Base />}>
            <Route path="/booking" element={<MovieList />} />
            <Route path="/booking/:movieId" element={<TicketBooking />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/about" element={<About />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="*" element={<Notfound />} />
            <Route
              path="/adminmoviedashboard"
              element={<AdminMovieDashboard />}
            />
            <Route
              path="/adminmoviedashboard/moviemanagement/add-movie"
              element={<AddMovies />}
            />
            <Route
              path="/adminmoviedashboard/moviemanagement/create-category"
              element={<CreateMovieCategory />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
