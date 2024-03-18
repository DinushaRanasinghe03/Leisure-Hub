import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Movie = ({ item }) => {
  const { name, id } = item;
  const navigate = useNavigate()

  return (
    <div className="overflow-hidden">
      <img
        className="w-full h-100vh rounded-lg object-cover"
        src={item?.poster_path}
        alt={name}
      />
      <div className="py-2">
        <h2 className="font-bold text-left text-lg mb-4">{name}</h2>
      </div>

      <div className="mt-2 flex justify-start gap-4">
        <Link
          to={`/booking/${id}`}
          className="border bg-secondary text-black py-2 px-4 rounded-md mt-2"
          state={item}
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
  );
}

export default Movie