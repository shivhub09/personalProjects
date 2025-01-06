import React, { useState } from 'react';
import './StarRating.css';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="starRating-container">
      <div className="starRatingtitle-container">
        <input type="text" name="" className='starRating-title' id="" placeholder='Star Rating'/>
      </div>
      <div className="starRating-stars">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <svg
                className="star"
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
                fill={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                viewBox="0 0 24 24"
                width="24" height="24"
              >
                <path d="M12 .587l3.668 7.425L24 9.423l-6 5.84 1.416 8.253L12 18.897l-7.416 3.892L6 15.263 0 9.423l8.332-1.411z" />
              </svg>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default StarRating;
