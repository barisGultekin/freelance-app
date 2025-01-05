import React, { useState } from "react";
import "./PostCard.css";

import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface PostCardProps {
  id: string;
  title: string;
  body: string;
  comments: { [postId: string]: any[] };
  commentCount: number;
  commentLoading: { [postId: string]: boolean }; // Pass loading state
  loadComments: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  body,
  comments,
  commentCount,
  commentLoading,
  loadComments,
}) => {
  const [areCommentsVisible, setAreCommentsVisible] = useState(false); // Track visibility of comments
  const isLoading = commentLoading[id]; // Check if this post is loading

  const handleToggleComments = () => {
    if (!comments[id] && !areCommentsVisible) {
      // Fetch comments if not already loaded and not visible
      loadComments(id);
    }
    // Toggle visibility
    setAreCommentsVisible((prev) => !prev);
  };

  return (
    <div className="post-card">
      <h3>{title}</h3>
      <div>{body}</div>
      <button
        className="comment-button"
        onClick={handleToggleComments}
        disabled={isLoading}
      >
        {isLoading
          ? "Loading Comments..."
          : areCommentsVisible
            ? <><FaChevronUp />{commentCount} Comments</>
            : <><FaChevronDown />{commentCount} Comments</>}
      </button>
      {areCommentsVisible && comments[id] && (
        <div className="comments">
          {comments[id].map((comment) => (
            <div className="comment" key={comment.id}>
              <div className="comment-img">
                <img
                  src={`https://robohash.org/${comment.email}?size=50x50`}
                  alt="Commentor"
                />
              </div>
              <div className="comment-content">
                <div className="comment-email">{comment.email}</div>
                <div>{comment.body}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
