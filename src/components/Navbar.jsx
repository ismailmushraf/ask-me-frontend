import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = (e) => {
    let isLogout = confirm("Do you want to logout?");
    if (!isLogout) {
      e.preventDefault();
      return;
    }
    logout();
    navigate('/signin');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (<>
    {isAuthenticated && (
      <>
        <div className={`overlay ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
        <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
          <span className='logo'>Ask Me ...</span>
          <div className='menu-toggle' onClick={toggleMenu}>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
          </div>
          <ul className={`nav-items ${isMenuOpen ? 'open' : ''}`}>
            <li className="nav-item"><NavLink to='/'>Feed</NavLink></li> 
            <li className="nav-item"><NavLink to='/ask-question'>Ask Question</NavLink></li> 
            {isAuthenticated ? (
              <li className="nav-item"><NavLink to='/signin' onClick={handleLogout}>Log out</NavLink></li>
            ) : (
              <>
                <li className="nav-item"><NavLink to='/signin'>Log In</NavLink></li>
                <li className="nav-item"><NavLink to='/signup'>Sign Up</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </>
    )}
  </>)
}
