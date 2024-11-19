import React, { useEffect, useState } from "react";
import { API_URL } from "../data/ApiPath";

const AllProduct = () => {
  const [products, setProducts] = useState([]);

  // Fetch products
  const productHandler = async () => {
    const firmId = localStorage.getItem("firmId");

    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductsData = await response.json();
      setProducts(newProductsData.products);
      console.log("newPoroducts",newProductsData);
    } catch (error) {
      console.error("Failed to load products", error);
    }
  };

  // Fetch products on page load
  useEffect(() => {
    productHandler();
  }, []);

  // Handle product deletion
  const deleteProductById = async (productId) => {
    const loginToken = localStorage.getItem("loginToken");

    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: loginToken
        }
      });

      if (response.ok) {
        // Remove product from state
        setProducts(products.filter((product) => product._id !== productId));
        alert("Product deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(
          `Failed to delete product: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Failed to delete product", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="main-content">
      {!products || products.length === 0 ? (
        <div className="no-products">No products available</div>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>
                  {item.image && (
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      className="product-image"
                      alt={item.productName}
                    />
                  )}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProductById(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProduct;
