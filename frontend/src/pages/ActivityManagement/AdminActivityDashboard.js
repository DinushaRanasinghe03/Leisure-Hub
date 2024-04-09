import React from "react";
import AdminActivityMenu from "../../components/Layout/AdminActivityMenu";
import LayoutAdmin from './../../components/Layout/LayoutAdmin';


export const AdminActivityDashboard = () => {
  return (
    <LayoutAdmin>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminActivityMenu />
          </div>
          <div className="col-md-9">Content</div>
        </div>
      </div>
      </LayoutAdmin>
  );
};

export default AdminActivityDashboard;
