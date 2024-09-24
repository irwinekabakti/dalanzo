import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  className?: string;
}

const Rating: React.FC<StarRatingProps> = ({ rating, className = "" }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className={`flex ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full_${i}`} className="text-yellow-400" />
      ))}

      {halfStars === 1 && <FaStarHalfAlt className="text-yellow-400" />}

      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty_${i}`} className="text-yellow-400" />
      ))}
    </div>
  );
};

export default Rating;
