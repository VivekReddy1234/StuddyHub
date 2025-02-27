import React, { useState } from 'react'
import Sign from './components/Sign'
import Courses from './components/Courses'
import './App.css'
import Forum from './pages/Forum'
import Cart from './components/Store/Cart'
import About from './components/About'
import Detail from './components/Detail.module'
import Chat from './components/ChatRoom/Chat'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Slides from './Slider'
import Video from './components/Video'
import Store from './components/Store/Store'
import Item from './components/Store/Item'
import SignIn from './components/SignIn'
import PdfUploader from './components/Pdf/Uploader'
import Chatbot from './components/chatbot/Chatbot'
import ProductAdder from './components/Store/ProductAdd'
import {Provider} from './components/Store/context-api/Cart.jsx'

const App = () => {

  const [cart,changeCart]=  useState([]);
  const setCart=(item)=>{
   changeCart(item);
  }
  const addtoCart=(item)=>{
     setCart((prev)=>[...prev,item]);
  }
  return (
   <>
     <Provider value={{cart,setCart,addtoCart}}>
         <Routes>
          <Route path='/forum' element={<Forum/>}/>

         <Route path='/' element={<About/>}/>
<Route path='/IIT' element={<Video  prop={"IIT.mp4"}/>}/>
<Route path='/mentor' element={<Chat/>}/>

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
<Route path='/bot' element={<Chatbot/>} ></Route>
<Route path='/upload' element={<PdfUploader/>}></Route>

          </Routes> 
{/*      
  <Slides></Slides> */}

  </Provider>
  
      </>
  )
}

export default App