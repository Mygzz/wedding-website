import React, { useState, useEffect } from "react";
import img1 from "../assets/courselPicture/1.jpg";
import img2 from "../assets/courselPicture/2.jpg";    
import img3 from "../assets/courselPicture/3.jpg";
import img4 from "../assets/courselPicture/4.jpg";
import img5 from "../assets/courselPicture/5.jpg";
import img6 from "../assets/courselPicture/6.jpg";
import img7 from "../assets/courselPicture/7.jpg";
import img8 from "../assets/courselPicture/8.jpg";


// Add this to your component or create a separate component
const PhotoGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const galleryImages = [
    img1,
    img2,
    img3,   
    img4,
    img5,
    img6,
    img7,
    img8
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5000); // Change slide every 2 seconds

    return () => clearInterval(timer);
  }, [galleryImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <section id="photo" className="py-12 md:py-16 bg-[#F5F4F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-['Playfair_Display'] font-bold text-[#49284D] text-center mb-8 md:mb-12">
          Photo & Video Gallery
        </h2>
        

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Image */}
          <div className="relative h-64 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <img
              src={galleryImages[currentSlide]}
              alt={`Gallery image ${currentSlide + 1}`}
              className="w-full h-full object-cover transition-opacity duration-500"
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#49284D] rounded-full p-2 transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#49284D] rounded-full p-2 transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex justify-center space-x-2 mt-4 overflow-x-auto py-2">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentSlide
                    ? "border-[#C587CD]"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;