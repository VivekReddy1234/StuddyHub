import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase/Context';
import './Signn.css';
import NavSign from './Nav-sign';
import Footer from './Footer';
import { FireBaseContext } from '../firebase/Context';
import { useNavigate } from 'react-router-dom';
import sign1 from "../assets/sign1.jpg";
import sign2 from "../assets/sign2.jpg";
import sign3 from "../assets/sign3.jpg";
import sign4 from "../assets/sign4.jpg";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Sign = () => {
  const navigate = useNavigate();
  const { SignUpEmail } = useContext(FireBaseContext);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      } else {
        console.log("error");
      }
    });

    return () => unsubscribe();
  }, []);

  const backgrounds = [sign1, sign2, sign3, sign4];
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const changeBackground = () => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    };

    const intervalId = setInterval(changeBackground, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    dob: '',
    city: '',
    role:''
  });

  const handleSignUp = async() => {
   await SignUpEmail(email, password, userData).then(() => {
    if(auth.currentUser)
      navigate('/');
    }).catch((error) => {
      console.error("Error signing up:", error);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  return (
    <>
      <div id="body" className="background"
        style={{
          backgroundImage: `url(${backgrounds[backgroundIndex]})`,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          transition: 'background-image 1s ease-in-out',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <NavSign />
        <div id='logo'></div>
        <div id="cover">
          <div id="sign-box"
            style={{
              backgroundImage: `url(${backgrounds[backgroundIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              transition: 'background-image 1s ease-in-out',
              overflowX: 'hidden',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="overlay">
              <div id='create'><p>Create your account</p></div>
              <label htmlFor="username">Username:
                <input type="text" name="username" id="username" placeholder='Enter your username' onChange={handleInputChange} value={userData.username} />
              </label>
              <label htmlFor="email">Email:
                <input type="email" name="email" id="email" placeholder='Enter your email' onChange={e => setEmail(e.target.value)} value={email} />
              </label>
              <label htmlFor="password">Password:
                <input type="password" name="password" id="password" placeholder='Enter your password' onChange={e => setPassword(e.target.value)} value={password} />
              </label>
             <label htmlFor="role">
              Role
              <input type="text" name="role" value={userData.role} placeholder='admin or user' onChange={handleInputChange} />
             </label>
              <label htmlFor="dob">Date of Birth:
                <input type="date" name="dob" id="dob" placeholder='Enter your date of birth' onChange={handleInputChange} value={userData.dob} />
              </label>
              <label htmlFor="city">City:
                <input type="text" name="city" id="city" placeholder='Enter your city name' onChange={handleInputChange} value={userData.city} />
              </label>
              <button id='signin' onClick={handleSignUp}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <div id='Footer'>
        <Footer />
      </div>
    </>
  );
};

export default Sign;
