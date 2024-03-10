import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Answer } from "../modals/Answer";
import { getPost, deletePost, submitAnswer, updateAnswer } from "../api";

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

  useEffect(() => {
    async function getQuestion() {
      try {
        const response = await getPost(postId);
        const post = response.data.post;
        const answers = response.data.answers;
        setFormData(post);
        setAnswers(answers);
      } catch(e) {
        console.error(e);
      }
    }

    getQuestion();
  }, [postId]);

  function handleSubmitAnswer() {
    submitAnswer(postId, answer)
      .then(({ post, answers }) => {
        setPost(post, answers);
        answerInputRef.current.value = '';
      }).catch(error => {
        alert(error);
      });
  }

  function handleUpdateAnswer() {
    updateAnswer(postId, currentEditAnswerId, answer)
      .then(({ answers }) => {
        setPost(null, answers);
        cancelEdit();
      }).catch(error => alert(error));
  }

  function handlePostDelete() {
    let isDelete = confirm("Do you want to delete the post");
    if (isDelete) {
      deletePost(postId)
        .then(({ msg }) => {
          alert(msg);
          navigate('/');
        }).catch(error => {
          const errorMessage = error.response ? error.response.data.msg : 'Unknown error';
          alert(`Error: ${errorMessage}`);
        });
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
    if (isEditMode) handleUpdateAnswer();
    else handleSubmitAnswer();
  }

  return <div className="container">
    <div className="post-details">
      {formData && (
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
      )}
      {answers && answers.map(answer => (
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
