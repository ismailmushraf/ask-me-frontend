import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, submitPost, updatePost } from "../api";

export function AskQuestion() {
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) return;
    setIsEditMode(true);
    async function getQuestion() {
      try {
        const response = await getPost(postId);
        const post = response.data.post;
        setFormData({
          title: post.title,
          description: post.description
        });
      } catch(e) {
        console.error(e);
      }
    }

    getQuestion();
  }, [postId]);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const submitQuestion = async () => {
    try {
      const response = await submitPost(formData);
      console.log(response.data);
      navigate('/');
    } catch(e) {
      console.error(e.response.data);
    }
  }

  const updateQuestion = async () => {
    try {
      const response = await updatePost({...formData, postId: postId});
      console.log(response.data);
      navigate(`/posts/${postId}`);
    } catch(e) {
      console.error(e.response.data.msg);
    }
  }

  function cancelEdit() {
    navigate(`/posts/${postId}`);
  }

  function handlePostQuestion() {
    if (isEditMode) updateQuestion();
    else submitQuestion();
  }

  return <div className="container">
    <div className="ask-question-page">
      <h1>Ask a public question</h1>
      <div id="instruction-box">
        <h3>Writing a good question</h3>
        <p>You’re ready to ask a programming-related question and this form will help guide you through the process.</p>
        <h4>Steps</h4>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Add “tags” which help surface your question to members of the community.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>
      <input className="answer-input form-title" name='title' placeholder="Enter Title" value={formData.title} onChange={handleInputChange} required/>
      <br></br>
      <textarea className="answer-input" name='description' placeholder="Enter Description" value={formData.description} onChange={handleInputChange} required></textarea> 
      <div>
        <button className="answer-btn" onClick={handlePostQuestion}>Submit Question</button>
        {isEditMode && <button className="answer-btn" onClick={cancelEdit}>Cancel</button>}
      </div>
    </div>
  </div>
}
