import React, { useEffect, useState } from "react";
import Movie from "../components/Movie";
import axiosInstance from "../axiosInstance";
import Layout from "./../components/Layout/Layout";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const res = await axiosInstance.get("/movies/get-movie");
      setMovies(res?.data?.movies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Layout title={"Booking Page"}>
      <div className="grid grid-flow-row md:grid-cols-4 grid-cols-1 gap-6 mx-28 my-14">
        {movies.map((item, index) => (
          <Movie key={index} item={item} />
        ))}
      </div>
    </Layout>
  );
};

export default MovieList;
