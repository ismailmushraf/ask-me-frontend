import './modals.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPostedTime } from '../utils';

export function Post({postId, title, description, createdAt, answers}) {
  const [postedTime, setPostedTime] = useState('');
  useEffect(() => {
    setPostedTime(formatPostedTime(createdAt));
  }, [createdAt]);

  return <div className='post'>
    <Link to={`/posts/${postId}`}>
      <div className='post-title'>{title}</div>
    </Link>
    <div className='post-desc'>{description}</div>
    <div className='post-footer'>
      <span className='post-footer-item'>{postedTime}</span>
      <span className='post-footer-item'>{answers.length} answers</span>
    </div>
  </div>
}
