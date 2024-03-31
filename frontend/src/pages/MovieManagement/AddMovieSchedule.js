import React, { useState, useEffect } from 'react'
import AdminMovieMenu from '../../components/Layout/AdminMovieMenu'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'

const { Option } = Select

const AddMovieSchedule = () => {
    const [movies, setMovies] = useState([])
    const [date, setDate] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [movie, setMovie] = useState("")
    const [unavailable_seats, setUnavailableSeats] = useState("")

    // get all category
    const getAllMovies = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/movies/get-movie')
            if (data?.success) {
                setMovies(data?.movies)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something wrong in getting category')
        }
    }

    useEffect(() => {
        getAllMovies();
    }, [])

    // create movie function
    const handleCreate = async (e) => {
        e.preventDefault()

        try {
            const movieScheduleData = new FormData()
            movieScheduleData.append("date", date)
            movieScheduleData.append("from", from)
            movieScheduleData.append("to", to)
            movieScheduleData.append("movie", movie)
            movieScheduleData.append("unavailable_seats", unavailable_seats)

            const { data } = await axios.post("http://localhost:8080/api/v1/movieschedule/create-schedule", movieScheduleData)

            if (data?.success) {
                toast.success("Movie scheduled successfully")
            } else {
                toast.error("Something went wrong")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    return (
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMovieMenu />
                </div>
                <div className='col-md-9 '>
                    <h3 className='text-center'>Schedule Movie Showtime</h3>

                    <div className='m-1 w-75 '>
                        <label>Select a date : </label>
                        <div className='mb-3'>
                            <input
                                type="date"
                                value={date}
                                placeholder='date'
                                className='form-control'
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <label>From : </label>
                        <div className='mb-3'>
                            <input
                                type="time"
                                value={from}
                                placeholder='start time'
                                className='form-control'
                                onChange={(e) => setFrom(e.target.value)}
                            />
                        </div>

                        <label>To: </label>
                        <div className='mb-3'>
                            <input
                                type="time"
                                value={to}
                                placeholder='end time'
                                className='form-control'
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </div>

                        <label>Movie : </label>
                        <Select variant={false}
                            placeholder="Select a movie"
                            size="large"
                            showSearch
                            className='form-select mb-3'
                            onChange={(value) => { setMovie(value) }} >
                            {movies?.map(c => (
                                <Option key={c._id} value={c._id}>{c.name}</Option>
                            ))}
                        </Select>

                        <label>Unavailable seats : </label>
                        <div className='mb-3'>
                            <input
                                type="text"
                                value={unavailable_seats}
                                placeholder='Unavailable seats'
                                className='form-control'
                                onChange={(e) => setUnavailableSeats(e.target.value)}
                            />
                        </div>

                        <br />

                        <div className='mb-3 d-flex justify-content-center'>
                            <button className='btn btn-primary' onClick={handleCreate}>Schedule Showtime</button>
                        </div>

                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default AddMovieSchedule