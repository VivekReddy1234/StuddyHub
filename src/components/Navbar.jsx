import React, { useEffect, useState, useContext } from 'react';
import './Navbar.css';
import { auth } from '../firebase/Context';
import { onAuthStateChanged } from 'firebase/auth';
import { FireBaseContext } from '../firebase/Context';
import logo from '../assets/logo.png';

const Navbar = (props) => {
  const { SignOut } = useContext(FireBaseContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const activeElement = document.getElementById(props.active);
    if (activeElement) {
      activeElement.classList.add('hover');
    }
  }, [props.active]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOutUser = async () => {
    try {
      await SignOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="nav">
      <img src={logo} alt="Profile" id='logoNav' />
      <ul>
        <li id='courses'><a href="/courses">Courses</a></li>
        <li id='past'><a href="/Dashboard">Dashboard</a></li>
        <li id='about'><a href="/about">About Us</a></li>
        <li id='store'><a href="/store">Store</a></li>
        <li id='mentor'><a href="/mentor">Mentor</a></li>
        {user ? (
          <button id='LogOut' onClick={signOutUser} style={{ marginLeft: '200px' }}>Log Out</button>
        ) :
            
    
        
        (<a href="/sign">
              <button id='login' style={{ marginLeft: '200px' }}>Register</button>
            </a>)
            
          
        }
      
          
           
          
        
      </ul>
    </div>
  );
}

export default Navbar;
