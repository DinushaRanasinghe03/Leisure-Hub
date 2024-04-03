import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./pages/MovieList";
import TicketBooking from "./pages/TicketBooking";
import Notfound from "./pages/Notfound";
import { CreateMovieCategory } from "./pages/MovieManagement/CreateMovieCategory";
import { AdminMovieDashboard } from "./pages/MovieManagement/AdminMovieDashboard";
import About from "./pages/About";
import AddMovies from "./pages/MovieManagement/AddMovies";
import HomePage from "./pages/HomePage";
import Payments from "./pages/Payments";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/booking" element={<MovieList />} />
          <Route path="/booking/:movieId" element={<TicketBooking />} />
          <Route path="/payment/:bookingId" element={<Payments />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
