import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us"}>
      <div className="about-container">
        <div className="row contactus">
          <div className="col-md-6"></div>
        </div>
        <h1 className="about-heading">About LEISUREHUB</h1>
        <div className="about-content">
          <p>
            Welcome to LEISUREHUB, your ultimate destination for a perfect blend
            of cinematic delight and exhilarating activities! Whether you're a
            devoted movie enthusiast eager to catch the latest blockbuster or an
            adventure seeker in search of thrilling games, LEISUREHUB has
            something extraordinary in store for you.
          </p>
          <p>
            Immerse yourself in our captivating world of cinematic wonder,
            where the silver screen comes alive with the latest releases
            spanning every genre imaginable. Whether it's pulse-pounding
            action, heartwarming dramas, or side-splitting comedies, our
            carefully curated movie lineup guarantees an unforgettable
            experience for audiences of all ages. And the best part? Booking
            tickets is a breeze – anyone can join the cinematic adventure with
            just a few clicks.
          </p>
          <p>
            But the excitement doesn't stop there. For those craving
            hands-on thrills, our extensive selection of exhilarating
            activities and games beckons. Engage in adrenaline-pumping
            battles with friends in our state-of-the-art laser tag arena,
            test your skills and reflexes at our arcade filled with classic
            and modern games, or embark on immersive virtual reality
            adventures that transport you to fantastical realms. These
            experiences are exclusive to registered members of LEISUREHUB.
          </p>
          <p>
            Becoming a member not only grants you access to our thrilling
            activities but also unlocks a world of exclusive perks and
            privileges. Enjoy priority access to activities, special
            discounts on tickets and concessions, and personalized
            recommendations tailored to your unique interests and preferences.
            With membership, each visit to LEISUREHUB promises excitement,
            satisfaction, and unforgettable memories.
          </p>
          <p>
            Don't delay – join us at LEISUREHUB, where every moment is
            meticulously designed to cater to your leisure desires. Book your
            tickets, become a member, and embark on a journey of entertainment
            and adventure unlike any other. Your extraordinary experience
            awaits!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
