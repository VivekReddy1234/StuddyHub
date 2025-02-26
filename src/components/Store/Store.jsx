import React from 'react'
import Navbar from '../Navbar'
import "./Store.css"
import Box from '../Box'
import Object from './Object'
import book1 from "../../assets/books/book1.jpeg"
import book2 from "../../assets/books/book2.jpg"
import book3 from "../../assets/books/book3.webp"
import book4 from "../../assets/books/book4.jpeg"
import book5 from "../../assets/books/book5.webp"
import elec1 from '../../assets/elec/elec1.webp'
import elec2 from '../../assets/elec/elec2.webp'
import elec3 from '../../assets/elec/elec3.jpg'
import elec4 from '../../assets/elec/elec4.jpg'
import elec5 from '../../assets/elec/elec5.jpg'
import miss1 from '../../assets/miss/miss1.webp'
import miss2 from '../../assets/miss/miss2.webp'
import miss3 from '../../assets/miss/miss3.webp'
import miss4 from '../../assets/miss/miss4.webp'
import miss5 from '../../assets/miss/miss5.webp'
import stat1 from '../../assets/stat/stat1.webp'
import stat2 from '../../assets/stat/stat2.webp'
import { auth } from '../../firebase/Context';

import stat3 from '../../assets/stat/stat3.jpg'
import stat4 from '../../assets/stat/stat4.jpg'
import stat5 from '../../assets/stat/stat5.webp'
import LoadingSpinner from '../Loading';
import { useState ,useEffect} from 'react'
import ProductCard from './ProductAdd'
import { useContext } from 'react'
import { Context } from './context-api/Cart'
const store = () => {
  
  const context=useContext(Context)
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
    <>
          {user && user.displayName === 'admin' ?(<><Navbar active='store'/>
          <ProductCard/> </>):(<div id='store-body'>
    <Navbar active='store'/>
    <div id="sales">
      <div className='sale'>
    <h1>ELECTRONICS</h1>
    
    <div className="sale-box">
    <div className="object"><Object url={elec5} price={250.36} width={140} height={140} name={"Asus Tablet"}/></div>
    <div className="object"><Object url={elec1} price={300.99} width={120} height={140} name={"Poco M3"}/></div>
    <div className="object"><Object url={elec2} price={800.54} width={120} height={140} name={"iPhone 15"}/></div>
    <div className="object"><Object url={elec3} price={1100.36} width={180} height={100} name={"HP pavillion"}/></div>
    <div className="object"><Object url={elec4} price={300.95} width={160} height={120} name={"iPad"} /></div>

    

    </div>
    </div>
    
    <div className='sale'>
    <h1>BOOKS</h1>
    <div className="sale-box">
    <div className="object"><Object url={book5} price={4.99} width={100} height={140} name={"jee chemistry"}/></div>
  
    <div className="object"><Object url={book1} price={12.99} width={100} height={140} name={"book2"}/></div>
    <div className="object"><Object url={book2} price={7.99} width={100} height={140} name={"HC Verma"}/></div>
    <div className="object"><Object url={book3} price={6.99} width={100} height={140} name={"book1"}/></div>
    <div className="object"><Object url={book4} price={9.99} width={100} height={140} name={"jee"}/></div>

    </div>
    </div>

    <div className='sale'>
    <h1>STATIONARY</h1>
    <div className="sale-box">
    <div className="object"><Object url={stat1} price={15.99} width={160} height={140} name={"book"}/></div>

    <div className="object"><Object url={stat2} price={2.99} width={100} height={140} name={"book"}/></div>
    <div className="object"><Object url={stat3} price={3.99} width={100} height={140} name={"book"}/></div>
    <div className="object"><Object url={stat4} price={8.99} width={160} height={140} name={"book"}/></div>
  
    <div className="object"><Object url={stat5} price={4.99} width={160} height={140} name={"book"}/></div>

    </div>
    </div>

    <div className='sale'>
    <h1>MISCALANEOUS</h1>
    <div className="sale-box">
    <div className="object"><Object url={miss1} price={8.99} width={100} height={140} name={"book"}/></div>
    <div className="object"><Object url={miss2} price={3.99} width={100} height={140} name={"book"}/></div>

    <div className="object"><Object url={miss3} price={18.99} width={100} height={140} name={"book"}/></div>
    
    <div className="object"><Object url={miss4} price={2.99} width={100} height={140} name={"book"}/></div>
    <div className="object"><Object url={miss5} price={32.99} width={100} height={140} name={"book"}/></div>

    </div>
    </div>

    </div>
    </div>)}
    
   </>
  )
}

export default store