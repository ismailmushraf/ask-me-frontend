import Cookies from "js-cookie";
import axios from "axios";

export function UserCard({ fullname, userId, profession }) {
  const handleAskQuestion = async () => {
    const token = Cookies.get('jwtToken');
    let question = prompt("Enter your Question");
    const res = await axios.post('http://localhost:3000/user/ask-question', {"toUserId": userId, "question": question}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      }
    });

    alert(res.data.msg);
  }
  return <div>
    <div>
      <img />
      <div>
        <h5>{fullname}</h5>
        <h6>{profession}</h6>
      </div>
    </div>
    <button onClick={handleAskQuestion}>Ask Question</button>
  </div>
}
