import { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import HomepageSliderImage1 from "../Assets/HomepageSliderImage1.jpg";
import HomepageSliderImage2 from "../Assets/HomepageSliderImage2.jpg";
import HomepageSliderImage3 from "../Assets/HomepageSliderImage3.jpg";
import "../Css-Code/HomepageSlideImagesCSS.css";

function HomepageSlideImages() {
  const [selectImages, setSelectImages] = useState(0);

  // This Images for Slider UI
  const Images = [
    HomepageSliderImage1,
    HomepageSliderImage2,
    HomepageSliderImage3
  ];

  // Function to go to the next image in the slider
  function rightside() {
      let nextIndex = selectImages + 1;
      if (nextIndex >= Images.length) {   // If it's the last image, loop back to the first
        nextIndex = 0;
      }
      setSelectImages(nextIndex);    // Update the index
  }

  // Function to go to the previous image in the slider
  const leftside = () => {
    setSelectImages((prev) =>      // If it's the first image, go to the last; otherwise, go to previous
      prev === 0 ? Images.length - 1 : prev - 1
    );
  };

  return (
    <div className="custom-slider-container">
      <div className="AllImages">
        <img
          src={Images[selectImages]}
          alt="Slider"
          className="custom-slider-image"
        />
      </div>

      <button className="slider-btn left-btn" onClick={leftside}>
        <FaChevronLeft />
      </button>

      <button className="slider-btn right-btn" onClick={rightside}>
        <FaChevronRight />
      </button>
    </div>
  );
}

export default HomepageSlideImages;
