import React, { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { collection, addDoc, doc, getDoc, setDoc, updateDoc,getDocs } from 'firebase/firestore';
import {
  getAuth, createUserWithEmailAndPassword,
 signOut,onAuthStateChanged,signInWithEmailAndPassword
} from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuFYs8UACd5u-niccUc4-ChLPOYyR5mqI",
  authDomain: "studyhub-d0ef7.firebaseapp.com",
  projectId: "studyhub-d0ef7",
  storageBucket: "studyhub-d0ef7.appspot.com",
  messagingSenderId: "2663693811",
  appId: "1:2663693811:web:6a0fd1012499d28e20e686",
  measurementId: "G-M2RH54BVXQ"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app)
const storage=getStorage()
export const FireBaseContext=createContext(null)

async function addUser(uid,userData){
  try{
    await setDoc(doc(db,"users",uid),userData)
    console.log(userData,"added to database")
  }
catch
{
  console.log("error")
}
}
async function addAdmin(uid,userData){
  try{
    await setDoc(doc(db,"Admin",uid),userData)
    console.log(userData,"added to database")
  }
catch
{
  console.log("error")
}
}
export const FirebaseProvider=(props)=>
  {
    

     const SignUpEmail=async(email,password,userData)=>
      {
        try{
         

          const userCredential= await createUserWithEmailAndPassword(auth,email,password)
          const user=userCredential.user
      
          const role=userData.role.toLowerCase()
          updateProfile(auth.currentUser,{displayName:role})
          if(role=='user')
          await addUser(user.uid,{email:user.email,...userData})
  else
  addAdmin(user.uid,{email:user.email,...userData})
        

        }
        catch
        {
          console.log("error")
        }
      }
    
  

      //Sign in

      const SignIn = async (email, password, role) => {
      
        try {
          
       
          if (role.toLowerCase() === "admin") {
            const querySnapshot = await getDocs(collection(db, "Admin"));
            let userExists = false;
      
            querySnapshot.forEach((doc) => {
              if (doc.data().email === email) {
                userExists = true;

              }
            });
      
            if (userExists) {
              await signInWithEmailAndPassword(auth, email, password);
              console.log("Sign-in successful");
              updateProfile(auth.currentUser,{displayName:role})
            } else {
              console.log("Email not found in admin collection");
            }
          } else {
            console.log("Only admin role is allowed to sign in");
          }
        } catch (error) {
          console.error("Error signing in: ", error);
        }
      };


      const AddProduct = async ({ id, name, price, category, image }) => {
        try {
            // Reference to Firebase Storage
            const imageRef = ref(storage, `store/${id}`);
            
            // Upload image to Firebase Storage
            const imageResult = await uploadBytes(imageRef, image);
    
            // Firestore references
            const storeRef = collection(db, 'store'); // Reference to 'store' collection
            const categoryDocRef = doc(storeRef, category); // Document reference under 'store' with name 'category'
            const productsCollectionRef = collection(categoryDocRef, 'products'); // Collection reference 'products' under 'category'
    
            // Add product document to Firestore
            await addDoc(productsCollectionRef, {
                id,
                name,
                price,
                imageUrl: imageResult.ref.fullPath // Full path of the uploaded image
            });
    
            console.log('Product added successfully.');
        } catch (error) {
            console.error('Error adding product:', error);
            // Handle error appropriately, such as displaying an error message or logging
        }
    };
        
      

      const SignOut=()=>
        {
          signOut(auth)
        }
      return(
        <FireBaseContext.Provider value={{SignUpEmail , SignOut,SignIn,AddProduct}}>
          {props.children}
        </FireBaseContext.Provider>
      )
  }

 