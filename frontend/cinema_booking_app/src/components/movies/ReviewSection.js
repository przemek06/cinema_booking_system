import Review from "./Review"

const ReviewSection = ({ reviews }) => {
    return (
        <div>
            {reviews.length > 0 ? <h3>Reviews</h3> : <></>}
            {reviews.map((review, index) => (
                <Review
                    key={index}
                    username={review.user.fullName}
                    description={review.description}
                    rating={review.rating}
                />
            ))}
        </div>
    )
}

export default ReviewSection