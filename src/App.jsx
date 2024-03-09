import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css'
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { Navbar } from './components/Navbar';
import { Feed } from './components/Feed';
import { AskQuestion } from './components/AskQuestion';
import { PostDetails } from './components/PostDetails';

function App() {

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/signin' Component={SignIn}></Route>
          <Route path='/signup' Component={SignUp}></Route>
          <Route path='/' Component={Feed}></Route>
          <Route path='/posts/:postId' Component={PostDetails} />
          <Route path='/ask-question' Component={AskQuestion}></Route>
          <Route path='/edit-question/:postId' Component={AskQuestion}></Route>
        </Routes>
      </div>
    </Router>      
  )
}

export default App
