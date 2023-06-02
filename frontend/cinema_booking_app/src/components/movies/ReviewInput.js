import React, { useState } from 'react';
import SubmitButton from '../buttons/SubmitButton';

const ReviewInput = ({ onSubmit, movieId }) => {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create the review object
        const review = {
            "rating": rating,
            "description": description,
            "movie": {
                "id": movieId
            }
        };

        // Pass the review to the parent component
        onSubmit(review);

        // Reset the form fields
        setRating(0);
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>
                Write a review
            </h3>
            <div>
                <label htmlFor="rating">Rating:</label>
                <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => handleRatingChange(star)}
                            style={{ cursor: 'pointer' }}
                        >
                            {star <= rating ? '★' : '☆'}
                        </span>
                    ))}
                </div>
            </div>
            <br/>

            <div>
                <label htmlFor="description">Description:</label>
                <br/>
                <textarea
                    id="description"
                    value={description}
                    cols="100"
                    rows="4"
                    onChange={handleDescriptionChange}
                    required
                />
            </div>

            <SubmitButton value="Add review"/>
        </form>
    )
}

export default ReviewInput
