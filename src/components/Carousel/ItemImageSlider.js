// import React from "react";
// import { Slide } from "react-slideshow-image";
// import "react-slideshow-image/dist/styles.css";

// const ItemImageSlider = (props) => {
//   console.log(props.images);
//   return (
//     <div className="h-500px">
//       <Slide>
//         {props.images[0].images.map((item, index) => {
//           <img className=" w-full" src={item}></img>;
//           console.log(item);
//         })}
//       </Slide>
//     </div>
//   );
// };

// export default ItemImageSlider;

import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
const slideImages = [
  {
    url: "images/slide_2.jpg",
    caption: "Slide 1",
  },
  {
    url: "images/slide_3.jpg",
    caption: "Slide 2",
  },
  {
    url: "images/slide_4.jpg",
    caption: "Slide 3",
  },
];

const ItemImageSlider = (props) => {
  return (
    <div className="slide-container">
      <Slide>
        {props.images[0].images.map((item, index) => (
          <div className="each-slide" key={index}>
            <div style={{ backgroundImage: `url(${item})` }}></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ItemImageSlider;
