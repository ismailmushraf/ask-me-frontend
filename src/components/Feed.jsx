import { Post } from "../modals/Post";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function Feed() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = Cookies.get('jwtToken');
      try {
        const res = await axios.get('http://localhost:3000/user/show-user-feed', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log(res.data.questions);
        setQuestions(res.data.questions);
      } catch(e) {
        console.error(e.message);
      }
    };

    fetchQuestions();
  }, []);
  
  return <div className='container'>
    {questions.map(item => (<Post key={item._id} postId={item._id} title={item.title} description={item.description} createdAt={item.createdAt} answers={item.answers} />))}
  </div>
}
