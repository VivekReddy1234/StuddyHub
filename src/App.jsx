import React from 'react'
import Sign from './components/Sign'
import Courses from './components/Courses'
import './App.css'
import Cart from './components/Store/Cart'
import About from './components/About'
import Detail from './components/Detail.module'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Slides from './Slider'
import Video from './components/Video'
import Store from './components/Store/Store'
import Item from './components/Store/Item'
import SignIn from './components/SignIn'

const App = () => {
  return (
   <>

         <Routes>
         <Route path='/' element={<About/>}/>
<Route path='/IIT' element={<Video  prop={"IIT.mp4"}/>}/>
<Route path='/C++' element={<Video  prop={"C++.mp4"}/>}/>
<Route path='/JAVA' element={<Video  prop={"JAVA.mp4"}/>}/>
<Route path='/detail/IIT' element={<Detail data={"IIT"}/>}></Route>
<Route path='/courses' element={<Courses/>}/>
<Route path='/sign' element={<SignIn/>}/>
<Route path='/about' element={<About/>}/>
<Route path='/detail/JAVA' element={<Detail data={'JAVA'}/>}></Route>
<Route path='/detail/C++' element={<Detail data={'C++'}/>}></Route>
 {/* <Route path='/results' element={<Result/>}/> */}
<Route path='/store' element={<Store/>}/> 
<Route path='/item' element={<Item/>}/>
<Route path='/Cart' element={<Cart/>}></Route>
          </Routes> 
{/*      
  <Slides></Slides> */}
  
      </>
  )
}

export default App