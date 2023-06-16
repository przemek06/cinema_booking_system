import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

const Review = ({ username, description, rating, isOwner, deleteReview }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} style={{ color: 'yellow', textShadow: '0px 0px 1px black' }}>&#9733;</span>);
      } else {
        stars.push(<span key={i}>&#9734;</span>);
      }
    }
    return stars;
  };

  return (
    <div>
      <hr />
      <h4>
        {username}
        {isOwner ? <React.Fragment> {" "} <button onClick={deleteReview}> <RiDeleteBinLine /> </button> </React.Fragment> : null}
      </h4>
      {renderStars()}
      <br />
      {description}
    </div>
  );
};

export default Review;
