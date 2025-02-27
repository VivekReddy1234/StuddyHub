import React from 'react';
import Grid from '../components/Grid';
import './Key.css';
import im1 from '../assets/miss/road1.jpeg'
import im2 from '../assets/miss/road2.png'
import im3 from '../assets/miss/road3.png'


import img1 from "../assets/mentor.jpeg"
import img3 from '../assets/mentor1.png'
import img2 from '../assets/mentor2.jpeg'
import lib from '../assets/lib1.jpeg'
import lib1 from '../assets/lib.jpeg'
import lib2 from '../assets/lib2.jpeg'
const Key = () => {
  let data1 = {
    img1: img1,
    img2: img2,
    img3: img3,
    head: "Personalised Study"
  };

  // Define default props for Grid component
  const defaultData1 = {
    img3: lib1,
    img1: lib,
    img2: lib2,
    head: "Default Head"
  };
  
  const defaultData2 = {
    img1: im3,
    img2: im1,
    img3: im2,
    head:""
  };

  return (
    <>
      {/* Render Grid component with data1 */}
      <Grid data1={data1}></Grid>

      {/* Render Grid component with default props */}
      <Grid data1={defaultData1}></Grid>

      {/* Render Grid component with default props */}
      <Grid data1={defaultData2}></Grid>
    </>
  );
};

export default Key;
