// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, X, Bed, Wifi, Tv, Bath, Mountain, Sparkles } from 'lucide-react';
// import { useMediaQuery } from 'react-responsive';

// const RoomDetailModal = ({ room, onClose, scrollToBookingForm }) => {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const isMobile = useMediaQuery({ maxWidth: 767 });

//     const handleNextImage = () => {
//         // setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.images.length);
//         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     };

//     const handlePrevImage = () => {
//         setCurrentImageIndex((prevIndex) => (prevIndex - 1 + room.images.length) % room.images.length);
//     };

//     let images = [room.imageUrl, room.imageUrl1, room.imageUrl2, room.imageUrl3, room.imageUrl4]
//     console.log(images)

//     // const getIconForFeature = (feature) => {
//     //     if (feature.toLowerCase().includes('bed')) return <Bed className="w-5 h-5 text-blue-500" />;
//     //     if (feature.toLowerCase().includes('wi-fi')) return <Wifi className="w-5 h-5 text-blue-500" />;
//     //     if (feature.toLowerCase().includes('tv')) return <Tv className="w-5 h-5 text-blue-500" />;
//     //     if (feature.toLowerCase().includes('shower') || feature.toLowerCase().includes('bathroom') || feature.toLowerCase().includes('jacuzzi')) return <Bath className="w-5 h-5 text-blue-500" />;
//     //     if (feature.toLowerCase().includes('view') || feature.toLowerCase().includes('balcony')) return <Mountain className="w-5 h-5 text-blue-500" />;
//     //     return <Sparkles className="w-5 h-5 text-blue-500" />;
//     // };

//     // Handler for the "Book Room" button
//     const handleBookRoom = () => {
//         onClose(); // Close the modal
//         // Pass the 'booking' id to the scroll function
//         // The booking form should have id="booking"
//         scrollToBookingForm('booking');
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300 animate-fade-in">
//             <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-3xl overflow-y-auto transform transition-all duration-300 animate-scale-up">
//                 <button
//                     onClick={onClose}
//                     className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
//                     aria-label="Close modal"
//                 >
//                     <X className="w-6 h-6" />
//                 </button>

//                 {/* Image Carousel */}
//                 <div className="relative overflow-hidden rounded-t-3xl h-64 sm:h-96 md:h-[400px] lg:h-[500px]">
//                     <img
//                         src={room.imageUrl}
//                         alt={`${room.type} - ${currentImageIndex + 1}`}
//                         className="w-full h-full object-cover transition-transform duration-500 animate-fade-in"
//                         onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/E5E7EB/9CA3AF?text=Image+Not+Found"; }}
//                     />
//                     {/* <img
//                         src={room.images[currentImageIndex]}
//                         alt={`${room.name} - ${currentImageIndex + 1}`}
//                         className="w-full h-full object-cover transition-transform duration-500 animate-fade-in"
//                         onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/E5E7EB/9CA3AF?text=Image+Not+Found"; }}
//                     /> */}

//                     {/* {room.images.length > 1 && ( */}
//                     {images.length > 1 && (
//                         <>
//                             <button
//                                 onClick={handlePrevImage}
//                                 className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors duration-200"
//                                 aria-label="Previous image"
//                             >
//                                 <ChevronLeft className="w-6 h-6" />
//                             </button>
//                             <button
//                                 onClick={handleNextImage}
//                                 className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors duration-200"
//                                 aria-label="Next image"
//                             >
//                                 <ChevronRight className="w-6 h-6" />
//                             </button>
//                         </>
//                     )}
//                 </div>

//                 <div className="p-6 sm:p-8">
//                     <h3 className="text-3xl sm:text-4xl font-bold text-blue-800 dark:text-blue-400 mb-2 font-display">{room.type}</h3>
//                     <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl font-body mb-4">{room.description}</p>
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//                         <span className="text-2xl font-bold text-blue-600 dark:text-blue-300 font-display">
//                             ₦{room.price.toLocaleString()} / night
//                         </span>
//                         <div className="flex items-center gap-2 mt-2 sm:mt-0">
//                             {/* {room.images.map((_, index) => ( */}
//                             {images.map((_, index) => (
//                                 <div
//                                     key={index}
//                                     className={`w-3 h-3 rounded-full transition-colors duration-200 ${
//                                         currentImageIndex === index ? 'bg-blue-600' : 'bg-gray-400 dark:bg-gray-600'
//                                     }`}
//                                 ></div>
//                             ))}
//                         </div>
//                     </div>
//                     <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 font-display">Room Features</h4>
//                     <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl font-body mb-4">{room.features}</p>
//                     {/* <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
//                         {room.features.map(feature => (
//                             <li key={feature} className="flex items-center text-gray-700 dark:text-gray-300 text-base sm:text-lg">
//                                 {getIconForFeature(feature)}
//                                 <span className="ml-3 font-body">{feature}</span>
//                             </li>
//                         ))}
//                     </ul> */}
//                     <button
//                         onClick={handleBookRoom}
//                         className="btn-primary w-full text-lg sm:text-xl group relative overflow-hidden magic-btn-hover"
//                     >
//                         <span className="relative z-10">Book this Room</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RoomDetailModal;

















import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";

const RoomDetailModal = ({ room, onClose, scrollToBookingForm }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Build array of available image URLs
  const images = [
    room.imageUrl,
    room.imageUrl1,
    room.imageUrl2,
    room.imageUrl3,
    room.imageUrl4,
  ].filter(Boolean); // remove null/undefined

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleBookRoom = () => {
    onClose();
    scrollToBookingForm("booking");
  };

  const handleImageClick = () => {
    if (isMobile) {
      setShowNav((prev) => !prev);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-3xl overflow-y-auto animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{ backgroundColor: '#2563eb', color: 'white' }}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Carousel */}
        <div
          className="relative overflow-hidden rounded-t-3xl h-64 sm:h-96"
          onClick={handleImageClick}
        >
          <img
            src={images[currentImageIndex]}
            alt={`${room.type} - ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 animate-fade-in"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/800x600/E5E7EB/9CA3AF?text=Image+Not+Found";
            }}
          />

          {/* Navigation buttons (always on desktop, toggle on mobile) */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                style={{ backgroundColor: '#2563eb', color: 'white' }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextImage}
                style={{ backgroundColor: '#2563eb', color: 'white' }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          <h3 className="text-3xl sm:text-4xl font-bold text-blue-800 dark:text-blue-400 mb-2">
            {room.type}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-4">
            {room.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              ₦{room.price.toLocaleString()} / night
            </span>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentImageIndex === index
                      ? "bg-blue-600"
                      : "bg-gray-400 dark:bg-gray-600"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Room Features
          </h4>
          <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-4">
            {room.features}
          </p>

          <button
            onClick={handleBookRoom}
            className="btn-primary w-full text-lg sm:text-xl"
          >
            Book this Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailModal;














// import React, { useState } from "react";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";

// const RoomDetailModal = ({ room, onClose }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   if (!room) return null;

//   const handlePrev = () => {
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? room.images.length - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentImageIndex((prev) =>
//       prev === room.images.length - 1 ? 0 : prev + 1
//     );
//   };

//   return (
//     <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full relative overflow-hidden">
        
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 z-20"
//         >
//           <X size={20} />
//         </button>

//         {/* Image Carousel */}
//         <div className="relative w-full h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//           {room.images && room.images.length > 0 ? (
//             <img
//               src={room.images[currentImageIndex]}
//               alt={`${room.type} ${currentImageIndex + 1}`}
//               className="w-full h-full object-cover transition-all duration-500"
//             />
//           ) : (
//             <p className="text-gray-500">No images available</p>
//           )}

//           {/* Prev Button */}
//           {room.images && room.images.length > 1 && (
//             <button
//               onClick={handlePrev}
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
//             >
//               <ChevronLeft size={24} />
//             </button>
//           )}

//           {/* Next Button */}
//           {room.images && room.images.length > 1 && (
//             <button
//               onClick={handleNext}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
//             >
//               <ChevronRight size={24} />
//             </button>
//           )}
//         </div>

//         {/* Room Info */}
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-3">{room.type}</h2>
//           <p className="text-gray-600 dark:text-gray-300 mb-4">
//             {room.description}
//           </p>
//           <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
//             ₦{room.price.toLocaleString()}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomDetailModal;
