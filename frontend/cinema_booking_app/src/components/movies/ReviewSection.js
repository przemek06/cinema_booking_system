import Review from "./Review"

const ReviewSection = ({ reviews, userId, deleteReview, isUser }) => {
    return (
        <div>
            {reviews.length > 0 ? <h3>Reviews</h3> : <></>}
            {reviews.map((review, index) => (
                <Review
                    key={index}
                    username={review.user.fullName}
                    description={review.description}
                    rating={review.rating}
                    isOwner={userId == review.user.id && isUser}
                    deleteReview = {() => deleteReview(review.id)}
                />
            ))}
        </div>
    )
}

export default ReviewSection