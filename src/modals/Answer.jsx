import axios from "axios";
import Cookies from "js-cookie";
import { formatPostedTime, shortenUserName } from "../utils";

export function Answer({ postId, answerId, answer, userName, postedAt, setPost, editAnswer }) {
  async function deleteAnswer() {
    try {
      const jwtToken = Cookies.get('jwtToken');
      const response = await axios.delete(`http://localhost:3000/user/delete-answer/${postId}/${answerId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
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
      <a onClick={deleteAnswer}>Delete</a>
    </div>
  </div>
}
