import React from "react";
import Card from "../Cards/Card";
import Slider from "../Carousel/Slider";
import Category from "../Navigation/Category";

function Homepage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col items-center xl:px-32">
      <Category />
      <Slider />
      <div className="w-full min-h-[10%] flex flex-col items-center justify-center">
        <Card page="/" />
      </div>
    </div>
  );
}

export default Homepage;
