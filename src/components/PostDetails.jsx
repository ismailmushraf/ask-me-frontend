import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Answer } from "../modals/Answer";

export function PostDetails() {
  const { postId } = useParams();
  const [formData, setFormData] = useState({});
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditAnswerId, setCurrentEditAnswerId] = useState(null);
  const answerInputRef = useRef();
  const postAnswerBtnRef = useRef();
  const navigate = useNavigate();
  let timeout = null;
  const jwtToken = Cookies.get('jwtToken'); 

  useEffect(() => {
    async function getQuestion() {
      try {
        const res = await axios.get(`http://localhost:3000/user/get-post/${postId}`);
        const post = res.data.post;
        const answers = res.data.answers;
        setFormData(post);
        setAnswers(answers);
      } catch(e) {
        console.error(e);
      }
    }

    getQuestion();
  }, [postId]);

  function submitAnswer() {
    axios.put('http://localhost:3000/user/submit-answer', { "postId": postId, "answer": answer}, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": 'application/json'
      }
    }).then((res) => {
      setPost(res.data.post, res.data.answers);
      answerInputRef.current.value = '';
    }).catch(e => alert(e.response.data.msg));
  }

  function updateAnswer() {
    axios.put('http://localhost:3000/user/edit-answer', { "postId": postId, "answerId": currentEditAnswerId, "answer": answer}, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": 'application/json'
      }
    }).then((res) => {
      setPost(null, res.data.answers);
      cancelEdit();
    }).catch(e => alert(e.response.data.msg));
  }

  function handlePostDelete() {
    let isDelete = confirm("Do you want to delete the post");
    if (isDelete) {
      axios.delete(`http://localhost:3000/user/delete-post/${postId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      }).then(response => {
        alert(response.data.msg);
        navigate('/');
      }).catch(e => console.error(e.response.data.msg));
    }
  }

  function setPost(post, answers) {
    if (post != null) setFormData(post);
    if (answers != null) setAnswers(answers);
  }

  function handleChangeInput(e) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setAnswer(e.target.value);
    }, 200);
  }

  function editAnswer(answer, answerId) {
    setCurrentEditAnswerId(answerId);
    setIsEditMode(true);
    answerInputRef.current.focus();
    answerInputRef.current.value = answer;
    postAnswerBtnRef.current.innerText = 'Update Your Answer';
  }

  function cancelEdit() {
    setIsEditMode(false);
    answerInputRef.current.value = '';
    postAnswerBtnRef.current.innerText = 'Post Your Answer';
  }

  function postAnswer() {
    if (isEditMode) updateAnswer();
    else submitAnswer();
  }

  return <div className="container">
    <div className="post-details">
      <div className="post-details-box">
        <div className="post-details-title">{ formData.title }</div>
        <div className="post-details-desc">{ formData.description }</div>
        <div className="post-details-footer">
          <Link to={`/edit-question/${postId}`}>
            Edit
          </Link>
          <a onClick={handlePostDelete}>Delete</a>
        </div>
      </div>
      {answers.map(answer => (
        <Answer key={answer._id} postId={postId} answerId={answer._id} answer={answer.answer} postedAt={answer.createdAt} userName={answer.userId.fullname} setPost={setPost} editAnswer={editAnswer}/>
      ))}
      <div style={{borderBottom: "1px solid rgb(229 231 235)", maxWidth: "100%", width: "1000px"}}></div>
      <div className="answer-box">
        <h3>Your Answer</h3>
        <textarea ref={answerInputRef} className="answer-input" name='answer' onChange={handleChangeInput} placeholder="Your Answer should have more than 200 characters" required></textarea>
        <div>
          <button ref={postAnswerBtnRef} className="answer-btn" onClick={postAnswer}>Post Your Answer</button>
          {isEditMode &&<button className="answer-btn" onClick={cancelEdit}>Cancel</button>}
        </div>
      </div>
    </div>
  </div>
}
