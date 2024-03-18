
import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'

const Search = () => {
    const [values,setValues] = useSearch()

  return (
    <Layout title={"Search Results"}>
        <br />
        <div className='container'>
            <div className='text-center'>
                <h2>Search Results</h2>
                <h6>
                    { values?.results.length < 1 
                    ? 'No Movies Found' 
                    : `Found ${values?.results.length}`}
                 </h6>
                 <div className='d-flex flex-wrap mt-4'>
          {values?.results.map(p => (
            <div className='card m-2' style={{width: "18rem"}}>
              <div className="card">
                <img src={`http://localhost:8080/api/v1/movies/movie-posterimage/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.language}</p>
                  <div className='d-flex justify-content-center'>
                    <button className='btn btn-primary ms-3'>More Details</button>
                    <button className='btn btn-secondary ms-3'>Reviews</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
            </div>
        </div> 
        <br/>
    </Layout>
  )
}
export default Search