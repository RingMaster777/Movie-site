import React from "react";
import HeroBanner from "./HeroBanner/HeroBanner";
import Popular from "./popular/Popular";
import "./style.scss";
import TopRated from "./topRated/TopRated";
import Trending from "./trending/Trending";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
