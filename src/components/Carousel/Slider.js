import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Slider() {
  return (
    <Carousel
      className="hidden w-[85%] z-0 m-[2%] md:flex"
      autoPlay
      interval="10000"
      infiniteLoop
      showThumbs={false}
      showArrows={false}
      emulateTouch={true}
    >
      <img
        src="https://gamezone.ge/images/promo/11/razer-7788_qngp-79.jpg"
        className="block w-full rounded-xl"
        alt="Wild Landscape"
      />

      <img
        src="https://gamezone.ge/images/promo/8/Tara.png"
        className="block w-full rounded-xl"
        alt="Camera"
      />

      <img
        src="https://gamezone.ge/images/promo/10/12_6wls-ry.jpg"
        className="block w-full rounded-xl"
        alt="Exotic Fruits"
      />
    </Carousel>
  );
}

export default Slider;
