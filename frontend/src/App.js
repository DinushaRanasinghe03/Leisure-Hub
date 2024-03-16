import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/user/Dashboard";
import { AdminActivityDashboard } from "./pages/ActivityManagement/AdminActivityDashboard";
import { CreateActivityCategory } from "./pages/ActivityManagement/CreateActivityCategory";
import { AddGamesAndActivities } from "./pages/ActivityManagement/AddGamesAndActivities";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route
          path="/adminactivitydashboard"
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
      </Routes>
    </>
  );
}

export default App;
