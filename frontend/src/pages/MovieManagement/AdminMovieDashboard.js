import React, { useState, useEffect } from 'react';
import AdminMovieMenu from '../../components/Layout/AdminMovieMenu';
import axios from 'axios';

const Movie = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReportData();
    }, []);

    const fetchReportData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/v1/movieschedule/generate-movie-report');
            setReportData(response.data.report);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movie report:', error);
            setLoading(false);
        }
    };

    const downloadReport = () => {
        const filename = 'Monthly_movie_report.csv'; 
        const csvData = generateCSV(reportData);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
    };

    const generateCSV = (data) => {
        // Generate CSV data here based on the report data
        let csv = 'Month-Year,Movie,No Of Screenings\n';
        data.forEach(monthReport => {
            monthReport.movies.forEach(movie => {
                if (movie.count > 0) {
                    csv += `${monthReport.monthYear},${movie.name},${movie.count}\n`;
                }
            });
        });
        return csv;
    };

    return (
        <div className='container-fluid m-4 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMovieMenu />
            </div>
                <div className='col-md-9'>
                    <h3 className="text-center">Movie Analysis</h3><br/>
                    <div className='col-md-10 mx-auto '>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Year-Month</th>
                                            <th>Movie</th>
                                            <th>No Of Screenings</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.map((monthReport, index) => (
                                            <React.Fragment key={index}>
                                                {monthReport.movies.map((movie, movieIndex) => (
                                                    movie.count > 0 && (
                                                        <tr key={movieIndex}>
                                                            {movieIndex === 0 && (
                                                                <td rowSpan={monthReport.movies.length}>{monthReport.monthYear}</td>
                                                            )}
                                                            <td>{movie.name}</td>
                                                            <td>{movie.count}</td>
                                                        </tr>
                                                    )
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                                <button className='btn btn-primary' onClick={downloadReport} disabled={loading}>Download Report</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Movie;
