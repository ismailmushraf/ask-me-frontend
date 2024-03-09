import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = 'https://askus-backend-10903e81559c.herokuapp.com';
const jwtToken = Cookies.get('jwtToken');

export const signIn = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/signin`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
    });
    return response;
  } catch(e) {
    console.error(e.response.data);
  }
}

export const signUp = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/signup`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch(e) {
    console.error(e.response.data);
  }
}

export const fetchQuestions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/show-user-feed`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
    return response;
  } catch(e) {
    console.error(e.response.data);
  }
};

export const getPost = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/get-post/${postId}`);
    return response;
    
  } catch(e) {
    console.error(e.response.data);
  }
}

export const submitPost = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/ask-question`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": 'application/json'
      }
    }); 
    return response;
  } catch(e) {
    console.error(e.response.data);
  }
}

export const updatePost = async (formData) => {
  try {
      const response = await axios.put(`${API_BASE_URL}/user/update-question`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": 'application/json'
        }
      }); 
      return response;
  } catch(e) {
    console.error(e.response.data);
  }
}

export const deletePost = (postId) => {
  return new Promise((resolve, reject) => {
      axios.delete(
        `${API_BASE_URL}/user/delete-post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
        .then((response) => {
          const msg = response.data.msg;
          resolve({ msg });
        })
        .catch((error) => {
          reject(error.response ? error.response.data.msg : 'Unknown error');
        });
    });
}

export const submitAnswer = (postId, answer) => {
  return new Promise((resolve, reject) => {
      axios.put(
        `${API_BASE_URL}/user/submit-answer`,
        { postId, answer },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => {
          const { post, answers } = response.data;
          resolve({ post, answers });
        })
        .catch((error) => {
          reject(error.response ? error.response.data.msg : 'Unknown error');
        });
    });
}

export const updateAnswer = (postId, answerId, answer) => {
  return new Promise((resolve, reject) => {
      axios.put(
        `${API_BASE_URL}/user/edit-answer`,
        { postId, answerId, answer },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => {
          const { answers } = response.data;
          resolve({ answers });
        })
        .catch((error) => {
          reject(error.response ? error.response.data.msg : 'Unknown error');
        });
    });
}

export const deleteAnswer = async (postId, answerId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/user/delete-answer/${postId}/${answerId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
    return response;
  } catch(e) {
    console.error(e);
  }
}

//export const updateQuestion = async () => {
  //try {
  //} catch(e) {
    //console.error(e.response.data);
  //}
//}
