import React from 'react';
import LayoutAdmin from './../components/Layout/LayoutAdmin';
import corn from './../assets/corn.jpg';
import user from './../assets/user.jpg';
import yoga from './../assets/yoga.jpg';
import employee from './../assets/employee.png';
import payment from './../assets/payment.png';
import cs from './../assets/cs.png';
import mn from './../assets/mn.jpg';
import game from './../assets/game.jpg'

const fields = [
  {
    name: "Movies",
    description: "Managing movies & showtime scheduling",
    image: corn
  },
  {
    name: "Games & Activities",
    description: "Managing games & activities",
    image: game
  },
  {
    name: "Members",
    description: "Managing members",
    image: user
  },
  {
    name: "Resources",
    description: "Managing resources",
    image: yoga
  },
  {
    name: "Maintenance",
    description: "Managing maintenance tasks",
    image: mn
  },
  {
    name: "Employees",
    description: "Managing employees",
    image: employee
  },
  {
    name: "Payments",
    description: "Managing payments",
    image: payment
  },
  {
    name: "Customer Services",
    description: "Managing customer services",
    image: cs
  }
];

const useStyles = {
  container: {
    margin: '0 auto',
    maxWidth: '1200px',
    padding: '20px',
  },
  title: {
    backgroundColor: '#7393B3',
    color: '#fff',
    padding: '10px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  box: {
    width: 'calc(25% - 10px)', // Adjusted width for four boxes per line with reduced margin
    backgroundColor: '#f7f7f7',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'box-shadow 0.3s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
    },
  },
  boxImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '50%',
    margin: '0 auto',
    marginBottom: '20px',
    display: 'block',
  },
  boxTitle: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  boxDescription: {
    color: '#666',
    lineHeight: '1.6',
  },
  // Add margin between the boxes
  boxMargin: {
    marginRight: '10px', // Reduced right margin
  },
};

const AdminDashboard = () => {
  return (
    <LayoutAdmin>
      <br/><br/>
      <div style={useStyles.container}>
        <div style={useStyles.title}>
          <h1>Admin Dashboard</h1>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {fields.map(field => (
            <div key={field.name} style={{ ...useStyles.box, ...useStyles.boxMargin }}>
              <img src={field.image} alt={field.name} style={useStyles.boxImage} />
              <h2 style={useStyles.boxTitle}>{field.name}</h2>
              <p style={useStyles.boxDescription}>{field.description}</p>
            </div>
          ))}
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AdminDashboard;
