import React from 'react';

const Review = ({ username, description, rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('★');
      } else {
        stars.push('☆');
      }
    }
    return stars.join('');
  };

  return (
    <div>
      <hr />
      <h4>{username}: </h4>
      {renderStars()}
      <br />
      {description}
    </div>
  );
};

export default Review;
