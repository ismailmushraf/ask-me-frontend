import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    profession: '', 
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSignUp = async () => {
    try {
      const { firstname, lastname, ...restFormData } = formData;
      const fullname = `${firstname} ${lastname}`;
      const response = await axios.post('http://localhost:3000/user/signup', { ...restFormData, fullname }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert(response.data.msg);
        navigate('/signin');
      }
    } catch(e) {
      if (e.response) {
        if (Array.isArray(e.response.data.msg)) {
          let message = "";
          for (let item of e.response.data.msg) {
            message += (item.message + "\n");
          }
          alert(message);
        } else {
          alert(e.response.data)
        }
      }
      console.error('Error during sign-up: ', e.response.data);
    }
  }

  return <div className='signup'>
    <span className='logo'>Ask Me ...</span>
    <div className='name-box'>
      <input className='custom-text-input' type='text' name='firstname' placeholder='First Name' onChange={handleInputChange} required/>
      <input className='custom-text-input' type='text' name='lastname' placeholder='Last Name' onChange={handleInputChange} required/>
    </div>
    <input className='custom-text-input' type='text' name='username' placeholder='Username' onChange={handleInputChange} required/>
    <input className='custom-text-input' type='email' name='email' placeholder='Email' onChange={handleInputChange} required/>
    <select name="profession" className='custom-text-input' onChange={handleInputChange} required>
      <option value="">Select your Profession ...</option>
      <option value="developer">Developer</option>
      <option value="designer">Designer</option>
      <option value="teacher">Teacher</option>
      <option value="doctor">Doctor</option>
      <option value="engineer">Engineer</option>
      <option value="writer">Writer</option>
      <option value="artist">Artist</option>
      <option value="chef">Chef</option>
      <option value="entrepreneur">Entrepreneur</option>
      <option value="scientist">Scientist</option>
      <option value="musician">Musician</option>
      <option value="athlete">Athlete</option>
      <option value="lawyer">Lawyer</option>
      <option value="journalist">Journalist</option>
    </select>
    <input className='custom-text-input' type='password' name='password' placeholder='Password' onChange={handleInputChange} required/>
    <button className='custom-text-input custom-btn' onClick={handleSignUp}>SignUp</button>
    <div className="sign-info">
      <span>Already have an account?</span>
      <Link to='/signin'>Log In</Link>
    </div>
  </div>
}
