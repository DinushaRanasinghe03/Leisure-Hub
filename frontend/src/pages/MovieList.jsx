import React, { useState } from "react";
import Movie from "../components/Movie";

const MovieList = () => {
  const [movies, setMovies] = useState([
    {
      adult: false,
      backdrop_path:
        "https://image.tmdb.org/t/p/w500/deLWkOLZmBNkm8p16igfapQyqeq.jpg",
      genre_ids: [14, 12, 28],
      id: 763215,
      original_language: "en",
      original_title: "Damsel",
      overview:
        "A young woman's marriage to a charming prince turns into a fierce fight for survival when she's offered up as a sacrifice to a fire-breathing dragon.",
      popularity: 2754.204,
      poster_path:
        "https://image.tmdb.org/t/p/w500/sMp34cNKjIb18UBOCoAv4DpCxwY.jpg",
      release_date: "2024-03-08",
      name: "Damsel",
      video: false,
      vote_average: 7.302,
      vote_count: 777,
      adult_ticket_price: 777,
      child_ticket_price: 2754,
    },

    {
      adult: false,
      backdrop_path:
        "https://image.tmdb.org/t/p/w500/gJL5kp5FMopB2sN4WZYnNT5uO0u.jpg",
      genre_ids: [28, 12, 16, 35, 10751],
      id: 1011985,
      original_language: "en",
      original_title: "Kung Fu Panda 4",
      overview:
        "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
      popularity: 2701.294,
      poster_path:
        "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
      release_date: "2024-03-02",
      name: "Kung Fu Panda 4",
      video: false,
      vote_average: 6.874,
      vote_count: 139,
      adult_ticket_price: 139,
      child_ticket_price: 2701,
    },
    {
      adult: false,
      backdrop_path:
        "https://image.tmdb.org/t/p/w500/xvk5AhfhgQcTuaCQyq3XqAnhEma.jpg",
      genre_ids: [28, 12, 35],
      id: 848538,
      original_language: "en",
      original_title: "Argylle",
      overview:
        "When the plots of reclusive author Elly Conway's fictional espionage novels begin to mirror the covert actions of a real-life spy organization, quiet evenings at home become a thing of the past. Accompanied by her cat Alfie and Aiden, a cat-allergic spy, Elly races across the world to stay one step ahead of the killers as the line between Conway's fictional world and her real one begins to blur.",
      popularity: 1548.478,
      poster_path:
        "https://image.tmdb.org/t/p/w500/95VlSEfLMqeX36UVcHJuNlWEpwf.jpg",
      release_date: "2024-01-31",
      name: "Argylle",
      video: false,
      vote_average: 6.117,
      vote_count: 580,
      adult_ticket_price: 580,
      child_ticket_price: 1548,
    },
    {
      adult: false,
      backdrop_path:
        "https://image.tmdb.org/t/p/w500/mDeUmPe4MF35WWlAqj4QFX5UauJ.jpg",
      genre_ids: [28, 27, 53],
      id: 1096197,
      original_language: "pt",
      original_title: "No Way Up",
      overview:
        "Characters from different backgrounds are thrown together when the plane they're travelling on crashes into the Pacific Ocean. A nightmare fight for survival ensues with the air supply running out and dangers creeping in from all sides.",
      popularity: 1389.893,
      poster_path:
        "https://image.tmdb.org/t/p/w500/hu40Uxp9WtpL34jv3zyWLb5zEVY.jpg",
      release_date: "2024-01-18",
      name: "No Way Up",
      video: false,
      vote_average: 6.047,
      vote_count: 233,
      adult_ticket_price: 233,
      child_ticket_price: 1389,
    },
    {
      adult: false,
      backdrop_path:
        "https://image.tmdb.org/t/p/w500/o6e8Y0Q7RZIWi4qcJq4s5OYOVJs.jpg",
      genre_ids: [878, 10749, 35],
      id: 792307,
      original_language: "en",
      original_title: "Poor Things",
      overview:
        "Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.",
      popularity: 1059.216,
      poster_path:
        "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
      release_date: "2023-12-07",
      name: "Poor Things",
      video: false,
      vote_average: 7.882,
      vote_count: 2332,
      adult_ticket_price: 2332,
      child_ticket_price: 1059,
    },
    {
      adult: false,
      backdrop_path:
        "https://image.tmdb.org/t/p/w500/8uVKfOJUhmybNsVh089EqLHUYEG.jpg",
      genre_ids: [878, 12],
      id: 693134,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1054.137,
      poster_path:
        "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
      release_date: "2024-02-27",
      name: "Dune: Part Two",
      video: false,
      vote_average: 8.403,
      vote_count: 1715,
      adult_ticket_price: 1715,
      child_ticket_price: 1054,
    },
  ]);

  //   useEffect(() => {
  //     axios.get(fetchURL).then((res) => {
  //       setMovies(res.data.results);
  //     });
  //   }, [fetchURL]);

  return (
    <>
      <div className="grid grid-flow-row md:grid-cols-4 grid-cols-1 gap-6">
        {movies.map((item, index) => (
          <Movie key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default MovieList;
