import React from "react";

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h2>{article.title}</h2>

      <p className="article-content">
        {article.content}
      </p>

      <div className="article-footer">
        <span>
          Source: {article.source_url || "N/A"}
        </span>
        <span>
          {new Date(article.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default ArticleCard;
