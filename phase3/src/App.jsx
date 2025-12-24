import React from "react";
import ArticleList from "./components/ArticleList";
import "./styles/styles.css";

const App = () => {
  return (
    <div className="app-container">
      <div className="header">
        <h1>BeyondChats Articles</h1>
        <p>Original & Updated Articles</p>
      </div>

      <ArticleList />
    </div>
  );
};

export default App;
