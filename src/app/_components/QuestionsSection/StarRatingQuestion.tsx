import React, { useState } from "react";
import { StarIcon } from "lucide-react";

interface StarRatingProps {
  id: number;
  onChange: (id: number, value: string) => void;
  onRatingChange: (rating: string) => void;
}

const StarRatingQuestion: React.FC<StarRatingProps> = ({ id, onRatingChange, onChange }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const ratingsMap: { [key: number]: string } = {
    1: "Very Bad",
    2: "Bad",
    3: "Poor",
    4: "Below Average",
    5: "Average",
    6: "Above Average",
    7: "Good",
    8: "Very Good",
    9: "Great",
    10: "Excellent",
  };

  // Function to handle star click
  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    onRatingChange(ratingsMap[rating]);
  };

  // Function to handle star hover
  const handleStarHover = (rating: number) => {
    setHoverRating(rating);
  };

  // Function to reset hover when mouse leaves
  const handleStarHoverLeave = () => {
    setHoverRating(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1" onMouseLeave={handleStarHoverLeave}>
        {Array.from({ length: 10 }, (_, i) => (
          <StarIcon
            key={i}
            className={`h-6 w-6 cursor-pointer transition-colors duration-200 ${i < (hoverRating || selectedRating || 0) ? "text-yellow-400" : "text-gray-400"
              }`}
            onMouseEnter={() => handleStarHover(i + 1)}
            onClick={() => handleStarClick(i + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default StarRatingQuestion;
