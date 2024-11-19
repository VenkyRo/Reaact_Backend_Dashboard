import React from "react";


const NotFound = () => {
  return (
    <div className="error-section">
      <img
        src="/src/img/notFound.png"
        alt="Page Not Found"
        className="error-image"
      />
      <h1 className="error-code">404</h1>
      <h2 className="error-message">
        Oops! The page you're looking for doesn't exist.
      </h2>
      <p className="error-description">
        It seems you've reached a broken link or the page has been moved.
        <a href="/" className="home-link">
          {" "}
          Go back to Home
        </a>
        .
      </p>
    </div>
  );
};

export default NotFound;
