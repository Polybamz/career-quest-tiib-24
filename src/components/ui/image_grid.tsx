import React, { useState } from "react";

const ImageGrid = ({ images = [] }) => {
  const [showAll, setShowAll] = useState(false);

  const previewImages = images.slice(0, 4);
  const extraCount = images.length - 4;

  return (
    <div className="w-full max-w-md">
      {/* Image grid */}
      <div className="grid grid-cols-2   overflow-hidden">
        {previewImages.map((url, index) => {
          const isLast = index === 3 && extraCount > 0;
          return (
            <div
              key={index}
              onClick={() => setShowAll(true)}
              className="relative cursor-pointer   overflow-hidden "
            >
              <img
                src={url}
                alt={`img-${index}`}
                className="w-full h-full border-[1px] object-cover transition-transform duration-300 hover:scale-105"
              />
              {isLast && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-2xl font-semibold">
                    +{extraCount}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal for all images */}
      {showAll && (
        <div
          onClick={() => setShowAll(false)}
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-4 w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={() => setShowAll(false)}
              className="absolute top-3 right-3 text-gray-700 hover:text-black text-xl"
            >
              ✕
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-6">
              {images.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`img-${i}`}
                  className="w-full h-40 border object-cover transition-transform duration-300 hover:scale-105 "
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
