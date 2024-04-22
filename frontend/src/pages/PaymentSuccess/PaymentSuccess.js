import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from '../../components/Layout/Layout';


 
const PaymentSuccessMessage = ({ paymentId }) => {
  const [id, setID] = useState('');
  const [movieName, setMoviename] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [netPayable , setnetPayable] = useState('');
  const [seatsNumbers , setSeats] = useState('');
  const [emailsum , setemailsum] = useState('');
  const [namesum , setnamesum] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('id');
    setID(id);
    try {
      const response = await axios.get(`/api/v1/payments/${id}`);
      const movies =  await axios.get(`/api/v1/movies/get-movie`);
      const schedule = await axios.get(`api/v1/movieschedule/get-singleschedule/${response.data.booking.schedule}`);
      const movie = movies.data.movies.filter((x) => x._id === response.data.booking.movie);
      
      console.log("responsedata",response.data.booking);
      console.log("movie", movie[0]);
      console.log("schedule", schedule);
      console.log("responsedata",response.data.booking.total);
      console.log("responsedata",response.data.booking.seats);
      console.log("responsedata",response.data.booking.email);
      console.log("responsedata",response.data.booking.name);


      const date = schedule.data.movieschedule.date.split('T')[0];
      const from = schedule.data.movieschedule.from;
      const total = response.data.booking.total;
      const seats = response.data.booking.seats;
      const email = response.data.booking.email;
      const name = response.data.booking.name;

      console.log("date",date);
      console.log("from",from);
      console.log("total",total);
      console.log("seats",seats);
      console.log("email",email);
      console.log("name",name);
     
      setScheduleDate(date);
      setMoviename(movie[0].name);
      setScheduleTime(from);
      setnetPayable(total);
      setSeats(seats);
      setemailsum(email);
      setnamesum(name);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Layout>
              <div style={{ marginBottom: '40px', color: 'green',textAlign: 'center',fontSize: '40px'}}>Movie Ticket Reservation Successful.</div>
              <div style= {{color: '#00008B',textAlign: 'center',fontSize: '20px'}}>When the movie reservation is due, please present the screenshot of this payment summary to the representative operating at the counter.</div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
              <div className="alert alert-success" role="alert" style={{ backgroundColor: '#b7e4c7', padding: '20px', borderRadius: '5px', width: '500px', height: '500px', fontSize: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>

              
             {/* <h3>Movie Name : {movieName}</h3>
             <h3>Movie Date : {scheduleDate}</h3>
             <h3>Movie Time : {scheduleTime}</h3>
             <h3>Selected Seats: {seatsNumbers}</h3>

             <h3> Total : {netPayable}</h3>
              */}
              
              <table style={{ borderCollapse: 'collapse', width: '60%', margin: 'auto' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Description</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left',width: '75%' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Movie Name</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' ,width: '75%'}}>{movieName}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Movie Date</td>
              <td style={{ border: '1px solid #ddd', padding: '8px',width: '75%' }}>{scheduleDate}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Movie Time</td>
              <td style={{ border: '1px solid #ddd', padding: '8px',width: '75%' }}>{scheduleTime}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Selected Seats</td>
              <td style={{ border: '1px solid #ddd', padding: '8px',width: '75%' }}>{seatsNumbers}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Total</td>
              <td style={{ border: '1px solid #ddd', padding: '8px',width: '75%' }}>{netPayable}</td>
            </tr>

            
          </tbody>
        </table>
        <table>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }} colSpan="2">User Contact Details</th>
              </tr>
              </thead>

              <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>User Name</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{namesum}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>User Email</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{emailsum}</td>
            </tr>
            
            
            </table>
             </div>
             </div>
    </Layout>
  );
};
 
export default PaymentSuccessMessage;