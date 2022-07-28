import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Slider() {
  return (
    <Carousel
      className="w-full z-0 "
      autoPlay
      interval="10000"
      infiniteLoop
      showThumbs={false}
      showArrows={false}
      emulateTouch={true}
    >
      <img
        src="https://gamezone.ge/images/promo/11/razer-7788_qngp-79.jpg"
        className="block w-full"
        alt="Wild Landscape"
      />

      <img
        src="https://gamezone.ge/images/promo/8/Tara.png"
        className="block w-full"
        alt="Camera"
      />

      <img
        src="https://gamezone.ge/images/promo/10/12_6wls-ry.jpg"
        className="block w-full"
        alt="Exotic Fruits"
      />
    </Carousel>
  );
}

export default Slider;
