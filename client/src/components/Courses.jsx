import React, { useContext, useEffect, useState } from 'react';
import { FireBaseContext } from '../firebase/Context.jsx';
import './Courses.css';
import Navbar from './Navbar';
import Box from './Box';
import { auth } from '../firebase/Context.jsx';
import LoadingSpinner from './Loading.jsx';

const Courses = () => {
  const { getUser } = useContext(FireBaseContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingSpinner/>;
  }

  return (
    <div id="course-body">
      {user && user.displayName === 'admin' ? (
        <>
          <Navbar active="courses" />
          <Box />
        </>
      ) : (
        <>
          <Navbar active="courses" />
          <Box />
        </>
      )}
    </div>
  );
};

export default Courses;
