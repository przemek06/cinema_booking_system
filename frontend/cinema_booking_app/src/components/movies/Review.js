import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

const Review = ({ username, description, rating, isOwner, deleteReview }) => {
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
      <h4>{username} {isOwner ? <button onClick={deleteReview}> <RiDeleteBinLine /></button> : <></>} </h4>
      {renderStars()}
      <br />
      {description}
    </div>
  );
};

export default Review;
