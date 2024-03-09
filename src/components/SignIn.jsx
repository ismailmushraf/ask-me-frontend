import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { signIn } from "../api";

export function SignIn() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate('/');
    }
  });

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const handleSignIn = async () => {
    try {
      const response = await signIn(formData);
      if (response.status === 200) {
        login(response.data['jwt-token']);
        alert('Logged in Succesfully');
        navigate('/');
      } 
    } catch(e) {
      console.error('Error happend during sign in');
    }
  };
  return <div className='signup'>
    <span className="logo">Ask Me ...</span>
    <input className='custom-text-input' type='text' name='username' placeholder='Username' onChange={handleInputChange} required/>
    <input className='custom-text-input' type='password' name='password' placeholder='Password' onChange={handleInputChange} required/>
    <button className='custom-text-input custom-btn' onClick={handleSignIn}>LogIn</button>
    <div className="sign-info">
      <span>Don't have an account?</span>
      <Link to='/signup'>Sign Up</Link>
    </div>
  </div>
}
