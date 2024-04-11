import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import "react-toastify/dist/ReactToastify.css";

import { AdminActivityDashboard } from "./pages/ActivityManagement/AdminActivityDashboard";
import { CreateActivityCategory } from "./pages/ActivityManagement/CreateActivityCategory";
import { AddGamesAndActivities } from "./pages/ActivityManagement/AddGamesAndActivities";
import { AllGamesAndActivities } from "./pages/ActivityManagement/AllGamesAndActivities";
import { ViewAllRequests } from "./pages/ActivityManagement/ViewAllRequests";
import { UpdateGamesAndActivities } from "./pages/ActivityManagement/UpdateGamesAndActivities";
import GamesAndActivities from "./pages/user/GamesAndActivities";
import GamesAndActivitiesRequests from "./pages/user/GamesAndActivitiesRequests";
import ActivityDetails from "./pages/ActivityDetails";
import SearchActivity from "./pages/SearchActivity";

import AdminMovieDashboard from "./pages/MovieManagement/AdminMovieDashboard";
import AddMovies from "./pages/MovieManagement/AddMovies";
import CreateMovieCategory from "./pages/MovieManagement/CreateMovieCategory";
import { Movies } from "./pages/user/Movies";
import Movie from "./pages/MovieManagement/Movie";
import UpdateMovie from "./pages/MovieManagement/UpdateMovie";
import AddMovieSchedule from "./pages/MovieManagement/AddMovieSchedule";
import ShowtimeSchedule from "./pages/MovieManagement/ShowtimeSchedule";
import SearchMovie from "./pages/SearchMovie";
import MovieDetails from "./pages/MovieDetails";
import ShowtimeScheduling from "./pages/user/ShowtimeScheduling";
import MovieList from "./pages/MovieList";
import TicketBooking from "./pages/TicketBooking";
import Payments from "./pages/Payments";

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import Profile from "./pages/user/Profile";
import BookedMovies from "./pages/user/BookedMovies";
import BookedActivities from "./pages/user/BookedActivities";
import Memberships from "./pages/Memberships";

import EmployeeForm from './pages/Employee/EmployeeForm';
import EmployeeList from './pages/Employee/EmployeeList';
import UpdateEmployeeForm from './pages/Employee/UpdateEmployeeForm';
import EmployeeLeaveForm from './pages/Employee/EmployeeLeaveForm';
import EmployeeLeaveList from './pages/Employee/EmployeeLeaveList';
import Adminleave from './pages/Employee/Adminleave';
import Adminleaveupdate from './pages/Employee/Adminleaveupdate';
import EmployeeSalaryForm from './pages/Employee/EmployeeSalaryForm';
import EmployeeSalaryList from './pages/Employee/EmployeeSalaryList';
import UpdateEmployeeSalaryForm from './pages/Employee/UpdateEmployeeSalaryForm';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activity/:slug" element={<ActivityDetails />} />
        <Route path="/gamesandactivities/search" element={<SearchActivity />} />
        <Route path="/gamesandactivities" element={<GamesAndActivities />} />
        <Route
          path="/gamesandactivitiesrequests/:slug"
          element={<GamesAndActivitiesRequests />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route
          path="/adminactivitydashboard/activitymanagement"
          element={<AdminActivityDashboard />}
        />
        <Route
          path="/adminactivitydashboard/activitymanagement/create-category"
          element={<CreateActivityCategory />}
        />
        <Route
          path="/adminactivitydashboard/activitymanagement/add-activities"
          element={<AddGamesAndActivities />}
        />
        <Route
          path="/adminactivitydashboard/activitymanagement/activities"
          element={<AllGamesAndActivities />}
        />
        <Route
          path="/adminactivitydashboard/activitymanagement/allgamesandactivities/:slug"
          element={<UpdateGamesAndActivities />}
        />
        <Route
          path="/adminactivitydashboard/activitymanagement/requests"
          element={<ViewAllRequests />}
        />

        <Route path="/search" element={<SearchMovie />} />
        <Route path="/moviedetails/:slug" element={<MovieDetails />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/schedules" element={<ShowtimeScheduling />} />
        <Route path="/about" element={<About />} />
        <Route path="/adminmoviedashboard" element={<AdminMovieDashboard />} />
        <Route
          path="/adminmoviedashboard/moviemanagement/add-movie"
          element={<AddMovies />}
        />
        <Route
          path="/adminmoviedashboard/moviemanagement/create-category"
          element={<CreateMovieCategory />}
        />
        <Route
          path="/adminmoviedashboard/moviemanagement/movie"
          element={<Movie />}
        />
        <Route
          path="/adminmoviedashboard/moviemanagement/movie/:slug"
          element={<UpdateMovie />}
        />
        <Route
          path="/adminmoviedashboard/moviemanagement/add-movieschedule"
          element={<AddMovieSchedule />}
        />
        <Route
          path="/adminmoviedashboard/moviemanagement/movieschedule"
          element={<ShowtimeSchedule />}
        />

        <Route path="/booking" element={<MovieList />} />
        <Route path="/booking/:movieId" element={<TicketBooking />} />
        <Route path="/payment/:bookingId" element={<Payments />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/booked-movies" element={<BookedMovies />} />
          <Route path="user/booked-activities" element={<BookedActivities />} />
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/memberships" element={<Memberships />} />
      
      
        <Route path="/employeeregister" element={< EmployeeForm/>} />
          <Route path="/employeelist" element={< EmployeeList/>} />
          <Route path='/updateEmploee/:employeeId' element={<UpdateEmployeeForm />} />
          <Route path='/employeeleave' element={<EmployeeLeaveForm/>}/>
          <Route path="/employeeleavelist" element={< EmployeeLeaveList/>} />
          <Route path='/Adminleave' element={<Adminleave />} />
          <Route path='/adminleaveupdate/:leaveId' element={<Adminleaveupdate />} />
          <Route path='/employeesalary' element={<EmployeeSalaryForm/>}/>
          <Route path='/employeesalarylist' element={<EmployeeSalaryList/>}/> 
          <Route path="/updateEmployeeSalary/:id" element={<UpdateEmployeeSalaryForm />} />
      
      
      
      </Routes>
    </>
  );
}

export default App;
