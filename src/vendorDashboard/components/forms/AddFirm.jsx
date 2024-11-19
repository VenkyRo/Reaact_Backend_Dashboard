import React, { useState } from "react";
import { API_URL } from "../../data/ApiPath";

const AddFirm = () => {

  const [firmName,setFirmName] = useState("");
  const [area,setArea] = useState("");
  const [category,setCategory] = useState([]);
  const [region,setRegion] = useState([]);
  const [offer,setOffer] = useState("");
  const [file,setFile] = useState(null);

  const handleCategoryChange = (event)=>{
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=> item !== value))
    }else{
      setCategory([...category,value])
    }
  }

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(category.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event)=>{
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  }


  const FirmHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if(!loginToken){
        console.error("user Not Found!")
      }

      const formData = new FormData();
      formData.append('firmName',firmName);
      formData.append('area',area);
      formData.append('offer',offer);
      formData.append('image',file);
      category.forEach((value)=>{
        formData.append('category',value);
      })
      region.forEach((value)=>{
        formData.append('region',value);
      })

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers: {
          'token':`${loginToken}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        
        setFirmName("");
        setArea("");
        setCategory([])
        setRegion([])
        setOffer("")
        setFile(null)
        alert("Firm Added Sucessfully!");
        
      }

      console.log("this is firmId", data.firmId);
      const firmId = data.firmId;
      localStorage.setItem("firmId", firmId);

      
    } catch (error) {
      console.error("Firm Failed", error);
      alert("Firm Failed!");
    }
  };

  return (
    <>
      <div className="main-content">
        <form className="login-form" onSubmit={FirmHandleSubmit}>
          <h2>Add Firm</h2>

          <div className="form-group">
            <label htmlFor="firmName">FirmName</label>
            <input
              type="text"
              id="firmName"
              name="firmName"
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              placeholder="Enter your FirmName"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="area">area</label>
            <input
              type="text"
              id="area"
              name="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter your area"
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
            <label htmlFor="category">Region</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={region.includes("south-Indian")}
                  onChange={handleRegionChange}
                  id="veg"
                  name="category"
                  value="south-Indian"
                  className="checkbox-input"
                />
                South-Indian
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={region.includes("north-Indian")}
                  onChange={handleRegionChange}
                  id="non-veg"
                  name="category"
                  value="north-Indian"
                  className="checkbox-input"
                />
                North-Indian
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={region.includes("chinese")}
                  onChange={handleRegionChange}
                  id="non-veg"
                  name="category"
                  value="chinese"
                  className="checkbox-input"
                />
                Chinese
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={region.includes("bakery")}
                  onChange={handleRegionChange}
                  id="non-veg"
                  name="category"
                  value="bakery"
                  className="checkbox-input"
                />
                Bakery
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="offer">offer</label>
            <input
              type="text"
              id="offer"
              name="offer"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="Enter your offer"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageUpload}
            />
          </div>

          <button type="submit" className="login-btn">
            AddFirm
          </button>
        </form>
      </div>
    </>
  );
};

export default AddFirm;
