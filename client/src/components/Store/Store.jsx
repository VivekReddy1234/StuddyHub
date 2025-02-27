import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Navbar";
import Object from "./Object";
import ProductCard from "./ProductAdd";
import LoadingSpinner from "../Loading";
// import { Context } from "./context-api/Cart";
// import { BuyContext } from "./context-api/Buy";
import { auth } from "../../firebase/Context";

// Importing Assets
import book1 from "../../assets/books/book1.jpeg";
import book2 from "../../assets/books/book2.jpg";
import book3 from "../../assets/books/book3.webp";
import book4 from "../../assets/books/book4.jpeg";
import book5 from "../../assets/books/book5.webp";

import elec1 from "../../assets/elec/elec1.webp";
import elec2 from "../../assets/elec/elec2.webp";
import elec3 from "../../assets/elec/elec3.jpg";
import elec4 from "../../assets/elec/elec4.jpg";
import elec5 from "../../assets/elec/elec5.jpg";

import miss1 from "../../assets/miss/miss1.webp";
import miss2 from "../../assets/miss/miss2.webp";
import miss3 from "../../assets/miss/miss3.webp";
import miss4 from "../../assets/miss/miss4.webp";
import miss5 from "../../assets/miss/miss5.webp";

import stat1 from "../../assets/stat/stat1.webp";
import stat2 from "../../assets/stat/stat2.webp";
import stat3 from "../../assets/stat/stat3.jpg";
import stat4 from "../../assets/stat/stat4.jpg";
import stat5 from "../../assets/stat/stat5.webp";

const Store = () => {
  // const { addtoCart } = useContext(Context);
  // const { fxn } = useContext(BuyContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {user && user.displayName === "admin" ? (
        <>
          <Navbar active="store" />
          <ProductCard />
        </>
      ) : (
        <div className="w-screen min-h-screen bg-white text-black">
          <Navbar active="store" />
          <div className="ml-5">
            {/* Electronics Section */}
            <CategorySection title="ELECTRONICS">
              <Object url={elec5} price={250.36} width={140} height={240} name="Asus Tablet" />
              <Object url={elec1} price={300.99} width={120} height={240} name="Poco M3" />
              <Object url={elec2} price={800.54} width={120} height={240} name="iPhone 15" />
              <Object url={elec3} price={1100.36} width={180} height={240} name="HP Pavilion" />
              <Object url={elec4} price={300.95} width={160} height={240} name="iPad" />
            </CategorySection>

            {/* Books Section */}
            <CategorySection title="BOOKS">
              <Object url={book5} price={4.99} width={100} height={340} name="JEE Chemistry" />
              <Object url={book1} price={12.99} width={100} height={340} name="Book 2" />
              <Object url={book2} price={7.99} width={100} height={340} name="HC Verma" />
              <Object url={book3} price={6.99} width={100} height={340} name="Book 1" />
              <Object url={book4} price={9.99} width={100} height={340} name="JEE" />
            </CategorySection>

            {/* Stationary Section */}
            <CategorySection title="STATIONARY">
              <Object url={stat1} price={15.99} width={160} height={140} name="Notebook" />
              <Object url={stat2} price={2.99} width={100} height={140} name="Pen Set" />
              <Object url={stat3} price={3.99} width={100} height={140} name="Marker Set" />
              <Object url={stat4} price={8.99} width={160} height={140} name="Sketchbook" />
              <Object url={stat5} price={4.99} width={160} height={140} name="Sticky Notes" />
            </CategorySection>

            {/* Miscellaneous Section */}
            <CategorySection title="MISCELLANEOUS">
              <Object url={miss1} price={8.99} width={100} height={140} name="Bag" />
              <Object url={miss2} price={3.99} width={100} height={140} name="Water Bottle" />
              <Object url={miss3} price={18.99} width={100} height={140} name="T-Shirt" />
              <Object url={miss4} price={2.99} width={100} height={140} name="Cap" />
              <Object url={miss5} price={32.99} width={100} height={140} name="Smart Watch" />
            </CategorySection>
          </div>
        </div>
      )}
    </>
  );
};

// CategorySection Component (Reusable for Sections)
const CategorySection = ({ title, children }) => {
  return (
    <div className="my-6">
      <h1 className="text-2xl font-bold pl-3 text-orange-800">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 ml-3">
        {children}
      </div>
    </div>
  );
};

export default Store;
