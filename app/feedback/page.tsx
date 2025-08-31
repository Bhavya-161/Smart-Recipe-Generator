'use client';
import { useState, useEffect } from 'react';
import ImageUpload from '../../components/ImageUpload';
import Image from 'next/image';

interface Review {
  name: string;
  rating: number;
  comment: string;
  image?: string;
}

export default function FeedbackPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    setReviews(savedReviews);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = { name, rating, comment, image: image || undefined };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    setName('');
    setComment('');
    setRating(0);
    setImage(null);
  };

  return (
    <div className="container">
      <h1>Feedback</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="input"
        />

        <textarea
          placeholder="Your Feedback"
          value={comment}
          onChange={e => setComment(e.target.value)}
          required
          className="input"
        />

        <div>
          <label>Rating: </label>
          {[1, 2, 3, 4, 5].map(num => (
            <span
              key={num}
              style={{ cursor: 'pointer', color: rating >= num ? 'gold' : 'gray', fontSize: '20px' }}
              onClick={() => setRating(num)}
            >
              ★
            </span>
          ))}
        </div>

        <div style={{ marginTop: '10px' }}>
          <ImageUpload onImageChange={(img: string) => setImage(img)} />
         {image && typeof image === 'string' && (
  <Image
    src={image}
    alt="Uploaded"
    width={200}
    height={200}
    style={{ borderRadius: '5px', marginTop: '10px' }}
    unoptimized
  />
)}
        </div>

        <button type="submit" className="button" style={{ marginTop: '10px' }}>
          Submit Feedback
        </button>
      </form>

      <h2 style={{ marginTop: '30px' }}>Previous Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginTop: '10px',
              borderRadius: '5px',
            }}
          >
            <p><strong>{r.name}</strong></p>
            <p>{'★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)}</p>
            <p>{r.comment}</p>
            

{r.image && typeof r.image === 'string' && (
  <Image
    src={r.image}
    alt="User upload"
    width={150}
    height={150}
    style={{ borderRadius: '5px', marginTop: '5px' }}
    unoptimized
  />
)}

          </div>
        ))
      )}
    </div>
  );
}
