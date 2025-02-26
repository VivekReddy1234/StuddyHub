import React, { useState } from 'react';
import "./ProductAdd.css"
import { nanoid } from 'nanoid';
import { useContext } from 'react';
import { FireBaseContext } from '../../firebase/Context';
const ProductAdder = () => {
  const {AddProduct}=useContext(FireBaseContext)
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productImage, setProductImage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Form data object
        const formData = {
            id: nanoid(), // Generate unique ID
            name: productName,
            price: parseFloat(productPrice),
            category: productCategory,
            image: productImage,
        };
        AddProduct(formData)

        console.log('Form Data:', formData);
        // Here you can send formData to your backend or handle as needed

        // Reset the form
        setProductName('');
        setProductPrice('');
        setProductCategory('');
        setProductImage(null);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
    };

    return (
        <div className="container">
            <h2>Add a New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="productName">Product Name:</label>
                    <input
                    className="inputProduct"
                        type="text"
                        id="productName"
                        name="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="productPrice">Price:</label>
                    <input
                    className="inputProduct"
                        type="number"
                        id="productPrice"
                        name="productPrice"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="productCategory">Category:</label>
                    <input
                    className="inputProduct"
                        type="text"
                        id="productCategory"
                        name="productCategory"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="productImage">Image:</label>
                    <input 
                    className="inputProduct"
                        type="file"
                        id="productImage"
                        name="productImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>

                <button type="submit" className='buttonx'>Add Product</button>
            </form>
        </div>
    );
};

export default ProductAdder;
