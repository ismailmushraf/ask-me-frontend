import { formatPostedTime, shortenUserName } from "../utils";
import { deleteAnswer } from "../api";

export function Answer({ postId, answerId, answer, userName, postedAt, setPost, editAnswer }) {
  async function handleDeleteAnswer() {
    try {
      const response = await deleteAnswer(postId, answerId);
      setPost(null, response.data.answers);
    } catch(e) {
      alert(e.response.data.msg);
    }
  }

  function handleEdit() {
    editAnswer(answer, answerId);
  }

  return <div className="answer-card">
    <div className="answer-header">
      <img className="user-avatar" src="" alt={shortenUserName(userName)}/>
      <div className="answer-details">
        <div className="answer-username">{userName}</div>
        <div className="answer-postTime">{formatPostedTime(postedAt)}</div>
      </div>
    </div>
    <div className="answer-main">
      {answer}
    </div>
    <div className="answer-footer">
      <a onClick={handleEdit}>Edit</a>
      <a onClick={handleDeleteAnswer}>Delete</a>
    </div>
  </div>
}
