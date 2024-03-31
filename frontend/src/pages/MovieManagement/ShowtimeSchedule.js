import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminMovieMenu from '../../components/Layout/AdminMovieMenu';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';

const ShowtimeSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSchedules(selectedDate);
    }, [selectedDate]);

    const fetchSchedules = async (date) => {
        try {
            setLoading(true);
            const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            const formattedDate = utcDate.toISOString().split('T')[0];
            const { data } = await axios.get(`http://localhost:8080/api/v1/movieschedule/get-schedule-date/${formattedDate}`);
            if (data.success) {
                setSchedules(data.movieSchedules);
            } else {
                console.error('Failed to fetch schedules:', data.message);
            }
        } catch (error) {
            console.error('Error fetching schedules:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMovieMenu />
                </div>
                <div className='col-md-9 '>
                    <h3 className="text-center">Movie Showtime Schedule</h3>
                    <div className="mb-3">
                        <label className="form-label">Select Date:</label>
                        <DatePicker
                            value={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="form-control"
                        />
                    </div>
                    <br /><br /><br /><br/><br/><br/>
                    <h5><center>Showtime Schedule for {selectedDate.toLocaleDateString('en-US')}</center></h5>
                    <br/>
                    
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {schedules.length === 0 ? (
                                <p>No schedules available for the selected date.</p>
                            ) : (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Movie</th>
                                            <th>Unavailable Seats</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedules.map(schedule => (
                                            <tr key={schedule._id}>
                                            
                                                <td>{schedule.from}</td>
                                                <td>{schedule.to}</td>
                                                <td>{schedule.movie}</td>
                                                <td>{schedule.unavailable_seats.join(', ')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowtimeSchedule;