import React, { useState } from 'react'
import { API_URL } from "../../data/ApiPath";

const AddProduct = () => {

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [descrption, setDescrption] = useState("");


  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };


  const handleBestSeller = (event)=>{
    const value = event.target.value === 'true'
    setBestSeller(value)
  }

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };


  const ProductHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");


      if (!loginToken || firmId) {
        console.error("user Not Found!");
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("descrption", descrption);
      formData.append("image", image);


      category.forEach((value) => {
        formData.append("category", value);
      });
      

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: "POST",
        headers: {
          token: `${loginToken}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        setProductName("");
        setPrice("");
        setCategory([]);
        setDescrption("");
        setBestSeller(false);
        setImage(null);
        alert("product Added Sucessfully!");
      }
     


    } catch (error) {
      console.error(data.message);
      alert("Product Failed!");
    }
  };
 



  return (
    <>
      <div className="main-content">
        <form onSubmit={ProductHandleSubmit} className="login-form">
          <h2>Add Product</h2>

          <div className="form-group">
            <label htmlFor="productName">productName</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter your productName"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="area">price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter your price"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={category.includes("veg")}
                  id="veg"
                  name="category"
                  value="veg"
                  onChange={handleCategoryChange}
                  className="checkbox-input"
                />
                Veg
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={category.includes("non-veg")}
                  id="non-veg"
                  name="category"
                  value="non-veg"
                  onChange={handleCategoryChange}
                  className="checkbox-input"
                />
                Non-Veg
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bestSeller">Is it a Best Seller?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  id="bestSellerYes"
                  name="bestSeller"
                  value="true"
                  checked={bestSeller === true}
                  onChange={handleBestSeller}
                  required
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  id="bestSellerNo"
                  name="bestSeller"
                  value="false"
                  checked={bestSeller === false}
                  onChange={handleBestSeller}
                  required
                />
                No
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="offer">description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={descrption}
              onChange={(e) => setDescrption(e.target.value)}
              placeholder="Enter your description"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Product Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageUpload}
            />
          </div>

          <button type="submit" className="login-btn">
            Add PRoduct
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct