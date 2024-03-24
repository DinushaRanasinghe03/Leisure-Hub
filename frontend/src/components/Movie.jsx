import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { movieImageUrl } from "../recoil/atom/commonState";
import { useRecoilState } from "recoil";

const Movie = ({ item }) => {
  const { name, _id } = item;
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch image data from the backend
    axiosInstance
      .get(`/movies/movie-posterimage/${_id}`, {
        responseType: "arraybuffer", // Ensure response type is set to arraybuffer
        headers: {
          "Content-Type": "image/jpeg", // Ensure correct MIME type
        },
      })
      .then((response) => {
        // Convert arraybuffer to base64 string
        const base64String = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        // Construct data URL
        const url = `data:image/jpeg;base64,${base64String}`;
        setImageUrl(url);
        setIsLoading(false); // Set loading state to false once image is loaded
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        setIsLoading(false); // Set loading state to false in case of error
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-100vh bg-gray-200 animate-pulse"></div>
      ) : (
        <div className="overflow-hidden">
          <img
            className="w-full h-100vh rounded-lg object-cover"
            src={imageUrl}
            alt={name}
          />
          <div className="py-2">
            <h2 className="font-bold text-left text-lg mb-4">{name}</h2>
          </div>

          <div className="mt-2 flex justify-start gap-4">
            <Link
              to={`/booking/${_id}`}
              className="border bg-secondary text-black py-2 px-4 rounded-md mt-2"
              state={{ ...item, imageUrl }}
            >
              Buy Tickets
            </Link>
            <Link
              className="border border-secondary text-black py-2 px-4 rounded-md mt-2"
              // onClick={() => onNewsClick(newsItem)}
            >
              Watch trailer
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
