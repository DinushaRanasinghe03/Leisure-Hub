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

import AddContact from "./components/Pages/ContactUs/User/AddContact/AddContact";
import AddReply from "./components/Pages/ContactUs/Admin/AddReplyContact/AddReplyContact";
import ContactDetails from "./components/Pages/ContactUs/Admin/ContactDetails/ContactDetails";
import CheckContact from "./components/Pages/ContactUs/User/ReplyContact/CheckContact";
import AddRate from "./components/Pages/Rates/Add-Rates/AddRate";
import RateDetails from "./components/Pages/Rates/RateDetails/RateDetails";
import FindReview from "./components/Pages/Rates/FindReview/FindReview";
import UpdateReview from "./components/Pages/Rates/UpdateReview/UpdateReview";
import AddFeedBack from "./components/Pages/FeedBack/User/AddFeedBack";
import FeedBackDetails from "./components/Pages/FeedBack/Admin/FeedBackDetails";

import BasicCardDetailsForm from './pages/cardDetails/cardDetails.js';

import BasicExampleAdd from './pages/AddPaymentDetails/AddPaymentDetails.js';
import BasicExampleDelete from './pages/DeletePaymentDetails/DeletePayment.js';
import BasicExampleTable from './pages/ShowPaymentData/ShowPaymentData.js';
import OTPAuthenticationPage from './pages/otp/otp.js';
import OTPVerification from "./pages/verifyOTP/OTPVerify.js";
import PaymentSuccessMessage from "./pages/PaymentSuccess/PaymentSuccess.js"
import MembershipAdd from "./pages/MembershipPayments/MembershipPayment.js"
import PaymentSummaryPage from "./pages/PaymentSummary/PaymentSummary.js"
import PaymentUnSuccessMessage from "./pages/PaymentSuccess/ReservationUnsuccess.js"
import MemPaymentUnSuccessMessage from "./pages/MembershipPaymentStatus/MembershipPaymentUnsuccess.js"
import MemPaymentSuccessMessage from "./pages/MembershipPaymentStatus/MembershipPaymentSuccess.js"
import MemOTPVerification from "./pages/MembershipPaymentVerification/MembershipOTP.js"
import MemOTPAuthenticationPage from "./pages/MembershipPaymentVerification/MembersipPaymentOTP1.js"

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
        {/* <Route path="/payment/:bookingId" element={<Payments />} /> */}

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
      
      
      {/*Contact*/}
      
          <Route path="/addcontact" element={<AddContact />} />
          <Route path="/addreply/:id" element={<AddReply />} />
          <Route path="/contactdetails" element={<ContactDetails />} />
          <Route path="/checkcontact" element={<CheckContact />} />

          {/*Ratings*/}
          <Route path="/ratehome" element={<RateDetails />} />
          <Route path="/addrate" element={<AddRate />} />
          <Route path="/findrate" element={<FindReview />} />
          <Route path="/updatereview/:id" element={<UpdateReview />} />

          {/*FeedBack*/}
          <Route path="/addfeed" element={<AddFeedBack />} />
          <Route path="/feeddetails" element={<FeedBackDetails />} />


      <Route path="/payment/:bookingId" element={<BasicExampleAdd/>}/>
      <Route path="all" element={<BasicExampleTable/>}/>
      <Route path="edit" element={<BasicExampleDelete/>}/>
      <Route path="card" element={<BasicCardDetailsForm/>}/>
      <Route path="otp" element={<OTPAuthenticationPage/>}/>
      <Route path="verify" element={<OTPVerification/>}/>
      <Route path="/end" element={<PaymentSuccessMessage/>}/>
      <Route path="/membership" element={<MembershipAdd/>}/>
      <Route path="/psummary" element={<PaymentSummaryPage/>}/>
      <Route path="/resunsuccess" element={<PaymentUnSuccessMessage/>}/>
      <Route path="/memsuccess" element={<MemPaymentSuccessMessage/>}/>
      <Route path="/memunsuccess" element={<MemPaymentUnSuccessMessage/>}/>
      <Route path="/memotpverification" element={<MemOTPVerification/>}/>
      <Route path="/memOtpAuth" element={<MemOTPAuthenticationPage/>}/>
      
      </Routes>
    </>
  );
}

export default App;
