// components/PostDetail.js
import { useParams } from 'react-router-dom';
import CommentSection from './CommentSection';
import './CommentSection.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';

const PostDetail = ({ userId }) => {

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const { postId } = useParams();  
  
  const [ratingFeedback, setRatingFeedback] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:4000/api/posts/${postId}`)
      .then(response => {
        setPost(response.data);
        setAverageRating(response.data.averageRating); 
      })
      .catch(() => setError("Failed to fetch post details"));
  }, [postId]);


  const handleRating = (rating) => {
    axios.post(`http://localhost:4000/api/posts/${postId}/rate`, {
      userId,
      rating,
    })
      .then(response => {
        setAverageRating(response.data.newAverage);
        setUserRating(rating);
        setRatingFeedback('Thank you for your rating!');
        setTimeout(() => setRatingFeedback(null), 3000);
      })
      .catch(() => alert('Failed to submit your rating'));
  };

  
  console.log(postId);
  return (
    <div>
      <h2 className='overall'>User Comments <span className='st12'>★</span> </h2>
      {/* Nội dung chi tiết bài viết */}
      
      <CommentSection postId={postId} userId={userId} />

      <div className="star-rating">
        <div className='text_con'>
          <img className='frame' src={assets.conversation} alt="" />
          <p className='text_con1'>Can you give us your satifaction :)))</p>

        </div>
        <img src={assets.smiling} className='Smiling' alt="" />
        <h3 className='h3rate'>Rate for website :</h3>

        <div>
          {ratingFeedback && <p className="feedback">{ratingFeedback}</p>}
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={star <= userRating ? 'star selected' : 'star'}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
          
        ))}
        {ratingFeedback && <p className="feedback">{ratingFeedback}</p>}


        <p>Average : 4.4<span className='st'>★</span></p>
        </div>
      </div>
    </div>
    
  );
};

export default PostDetail;
