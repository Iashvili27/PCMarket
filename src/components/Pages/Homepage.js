import React from "react";
import Card from "../Cards/Card";
import Slider from "../Carousel/Slider";

function Homepage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col items-center ">
      <Slider />
      <div className="h-[50px] w-full border-b-2"></div>
      <div className="h-[100px] w-full border-b-2 flex items-center justify-center">
        <h3 className="text-2xl md:text-4xl font-bold">Most Viewed</h3>
      </div>
      <div className="w-full min-h-[600px] flex flex-col items-center justify-center">
        <Card page="/" />
      </div>
    </div>
  );
}

export default Homepage;
