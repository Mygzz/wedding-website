import React, { useState, useEffect, useRef } from "react";
import img1 from "../finalPic/1.jpg";
import img2 from "../finalPic/2.jpg";
import img3 from "../finalPic/3.jpg";
import img4 from "../finalPic/4.jpg";
import img5 from "../finalPic/5.jpg";
import img6 from "../finalPic/6.jpg";
import img7 from "../finalPic/7.jpg";
import img8 from "../finalPic/8.jpg";

const PhotoGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const galleryImages = [img1, img2, img3, img4, img5, img6, img7, img8];

  const googleDriveVideoUrl =
    "https://drive.google.com/file/d/1auJfyXfyOIj2BvTDQ8SIN-h5OekfXRc-/view?usp=sharing";

  const getEmbedUrl = (url) => {
    const match = url.match(/\/file\/d\/([^\/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(googleDriveVideoUrl);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

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

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <section id="photo" className="py-8 md:py-16 bg-[#F5F4F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#49284D] text-center mb-6 md:mb-12">
          Photo & Video Gallery
        </h2>

        {/* Image Carousel Section */}
        <div className="mb-12 md:mb-16">
          {/* Carousel Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Main Image */}
            <div className="relative h-48 sm:h-64 md:h-96 lg:h-[500px] rounded-lg md:rounded-xl overflow-hidden shadow-lg md:shadow-2xl">
              <img
                src={galleryImages[currentSlide]}
                alt={`Gallery image ${currentSlide + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
              />

              {/* Navigation Arrows - Smaller on mobile */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#49284D] rounded-full p-1 sm:p-2 transition-all duration-200"
                aria-label="Previous image"
              >
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6"
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
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#49284D] rounded-full p-1 sm:p-2 transition-all duration-200"
                aria-label="Next image"
              >
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6"
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

              {/* Slide Indicators - Smaller on mobile */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide ? "bg-white" : "bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Strip - Scrollable on mobile */}
            <div className="flex space-x-1 sm:space-x-2 mt-3 sm:mt-4 overflow-x-auto py-2 px-2 sm:px-0">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentSlide
                      ? "border-[#C587CD] scale-105"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View image ${index + 1}`}
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

        {/* Video Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-lg md:rounded-xl overflow-hidden shadow-lg md:shadow-2xl bg-black">
            {/* Google Drive Video Embed */}
            <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-[500px]">
              <iframe
                src={embedUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                onLoad={handleVideoLoad}
                title="Our Love Story Video"
              />

              {/* Loading State */}
              {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-[#49284D] text-sm sm:text-lg">
                    Loading video...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions for users - Smaller text on mobile */}
          <div className="text-center mt-3 sm:mt-4 px-2">
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Click the fullscreen icon in the video player for the best viewing
              experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
