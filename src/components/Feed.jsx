import { Post } from "../modals/Post";
import { useState, useEffect } from "react";
import { fetchQuestions } from "../api";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export function Feed() {
  const [questions, setQuestions] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }

    try {
      const getQuestions = async () => {
        const response = await fetchQuestions();
        setQuestions(response.data.questions);
      }

      getQuestions();
    } catch(e) {
      console.error(e.message);
    }
  }, []);
  
  return <div className='container'>
    {questions.map(item => (<Post key={item._id} postId={item._id} title={item.title} description={item.description} createdAt={item.createdAt} answers={item.answers} />))}
  </div>
}
