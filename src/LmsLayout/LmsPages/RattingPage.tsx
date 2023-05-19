import React, { useState } from 'react';
import './ReviewScreen.css';
interface Review {
	rating: number;
}

const ReviewScreen: React.FC = () => {
	const [rating, setRating] = useState<number>(0);
	const [reviews, setReviews] = useState<Review[]>([]);
	const [averageRating, setAverageRating] = useState<number>(0);

	const handleRatingChange = (value: number) => {
		setRating(value);
	};

	const handleReviewSubmit = () => {
		const newReview: Review = {
			rating: rating,
		};
		rating === 0 ? alert('Select Ratting') : setReviews([...reviews, newReview]);
		calculateAverageRating();
		setRating(0);
	};

	const calculateAverageRating = () => {
		const totalReviews = reviews.length + 1;
		const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0) + rating;
		const average = totalRatings / totalReviews;
		setAverageRating(parseFloat(average.toFixed(1)));
	};

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-6'>
					<div className='card'>
						<div className='card-body'>
							<h5 className='card-title'>Average Rating</h5>
							<h1 className='display-1 text-center'>{averageRating}</h1>
							<p className='card-text'>
								{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
							</p>
						</div>
					</div>
				</div>
				<div className='col-6'>
					<div className='card'>
						<div className='card-body'>
							<h5 className='card-title'>Rating Bars</h5>
							<div className='progress mb-3'>
								<div
									className='progress-bar bg-info'
									role='progressbar'
									style={{
										width: `${
											(reviews.filter((review) => review.rating === 5)
												.length /
												reviews.length) *
											100
										}%`,
									}}>
									5 Stars
								</div>
							</div>
							<div className='progress mb-3'>
								<div
									className='progress-bar bg-info'
									role='progressbar'
									style={{
										width: `${
											(reviews.filter((review) => review.rating === 4)
												.length /
												reviews.length) *
											100
										}%`,
									}}>
									4 Stars
								</div>
							</div>
							<div className='progress mb-3'>
								<div
									className='progress-bar bg-info'
									role='progressbar'
									style={{
										width: `${
											(reviews.filter((review) => review.rating === 3)
												.length /
												reviews.length) *
											100
										}%`,
									}}>
									3 Stars
								</div>
							</div>
							<div className='progress mb-3'>
								<div
									className='progress-bar bg-info'
									role='progressbar'
									style={{
										width: `${
											(reviews.filter((review) => review.rating === 2)
												.length /
												reviews.length) *
											100
										}%`,
									}}>
									2 Stars
								</div>
							</div>
							<div className='progress mb-3'>
								<div
									className='progress-bar bg-info'
									role='progressbar'
									style={{
										width: `${
											(reviews.filter((review) => review.rating === 1)
												.length /
												reviews.length) *
											100
										}%`,
									}}>
									1 Star
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='row mt-5'>
				<div className='col'>
					<h3>Leave a Review</h3>
					<div className='stars-container'>
						{[...Array(5)].map((_, index) => (
							<span
								key={index}
								className={`star ${rating >= index + 1 ? 'selected' : ''}`}
								onClick={() => handleRatingChange(index + 1)}
								onMouseEnter={() => handleRatingChange(index + 1)}
								// onMouseLeave={() => handleRatingChange(0)}
							>
								★
							</span>
						))}
					</div>
					<button
						type='button'
						className='btn btn-primary mt-3'
						onClick={handleReviewSubmit}>
						Submit Review
					</button>
				</div>
			</div>
		</div>
	);
};
export default ReviewScreen;
