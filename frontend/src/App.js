import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "./pages/DashboardAdmin";
import Resource from "./pages/Resource";
import Maintenance from "./pages/Maintenance";
import PageNotFound from "./pages/PageNotFound";
import AddResource from "./pages/resources/AddResource";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardAdmin />} />
        <Route path="/resource" element={<Resource />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/addResource" element={<AddResource />} />
      </Routes>
    </>
  );
}

export default App;
