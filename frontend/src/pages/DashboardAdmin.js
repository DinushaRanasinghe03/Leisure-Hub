import React from 'react';
import LayoutAdmin from './../components/Layout/LayoutAdmin';

const AdminDashboard = () => {
  return (
    <LayoutAdmin>
        <br/><br/>
    <div style={{ margin: '0 auto', maxWidth: '1200px' }}>
      <div style={{ backgroundColor: '#7393B3', padding: '10px', marginBottom: '10px' }}>
        <h1 style={{ textAlign: 'center' }}>Admin Dashboard</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ width: '45%', backgroundColor: 'lightgrey', padding: '20px', marginRight: '20px' }}>
          <h2 style={{ marginBottom: '20px' ,textAlign: 'center' }}>Movies</h2>
          <p>Manage movies and movie scheduling.</p>
        </div>
        <div style={{ width: '45%', backgroundColor: 'lightgrey', padding: '20px' }}>
          <h2 style={{ marginBottom: '20px' ,textAlign: 'center' }}>Games & Activities</h2>
          <p>Manage games and activities.</p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '20px' }}>
        <div style={{ width: '45%', backgroundColor: 'lightgrey', padding: '20px', marginRight: '20px' }}>
          <h2 style={{ marginBottom: '20px',textAlign: 'center'  }}>Resources</h2>
          <p>Manage resources.</p>
        </div>
        <div style={{ width: '45%', backgroundColor: 'lightgrey', padding: '20px' }}>
          <h2 style={{ marginBottom: '20px',textAlign: 'center'  }}>Maintenance</h2>
          <p>Manage maintenance tasks.</p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '20px' }}>
        <div style={{ width: '45%', backgroundColor: 'lightgrey', padding: '20px', marginRight: '20px' }}>
          <h2 style={{ marginBottom: '20px',textAlign: 'center'  }}>Staff</h2>
          <p>Manage employees.</p>
        </div>
        <div style={{ width: '45%', backgroundColor: 'lightgrey', padding: '20px' }}>
          <h2 style={{ marginBottom: '20px' ,textAlign: 'center' }}>Customer service</h2>
          <p>Manage customer services.</p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '20px' }}>
        <div style={{ width: '45%', backgroundColor: 'lightgrey', padding: '20px', marginRight: '20px' }}>
          <h2 style={{ marginBottom: '20px',textAlign: 'center'  }}>Members</h2>
          <p>Manage members.</p>
        </div>
        <div style={{ width: '45%', backgroundColor: 'lightgrey', padding: '20px' }}>
          <h2 style={{ marginBottom: '20px' ,textAlign: 'center' }}>Payment</h2>
          <p>Manage payments.</p>
        </div>
      </div>
    </div>
    </LayoutAdmin>
  );
};

export default AdminDashboard;
