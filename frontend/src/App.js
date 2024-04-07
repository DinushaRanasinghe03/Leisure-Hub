import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "./pages/DashboardAdmin";
import Resource from "./pages/Resource";
import Maintenance from "./pages/Maintenance";
import PageNotFound from "./pages/PageNotFound";
import AddResource from "./pages/Resources/AddResource";
import UpdateResource from "./pages/Resources/UpdateResource";

;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardAdmin />} />

        <Route path="/resource" element={<Resource />} />
        <Route path="/addResource" element={<AddResource />} />
        <Route path="/updateResource/:id" element={<UpdateResource />} />

        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
