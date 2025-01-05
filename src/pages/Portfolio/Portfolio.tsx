import React, { useEffect, useState } from "react";

import "./Portfolio.css";

import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import {
  fetchFreelancerById,
  fetchFreelancerPosts,
  fetchCommentsByPostId,
  fetchCommentCounts,
} from "../../features/freelancerDetailSlice.ts";
import { toggleSaveFreelancer } from "../../features/freelancerListSlice.ts";
import { RootState, AppDispatch } from "../../redux/store";

import ContactInfoRow from "../../components/ContactInfoRow/ContactInfoRow.tsx";
import PostCard from "../../components/PostCard/PostCard.tsx";
import HireForm from "../../components/HireForm/HireForm.tsx";
import Modal from "../../components/Modal/Modal.tsx";

import {
  FaChevronLeft,
  FaGlobe,
  FaPhone,
  FaLocationDot,
  FaEnvelope,
  FaHeart,
  FaRegHeart
} from "react-icons/fa6";

const Portfolio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { details, posts, comments, commentCounts, commentLoading, status } =
    useSelector((state: RootState) => state.freelancerDetails);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const savedFreelancers = useSelector(
    (state: RootState) => state.freelancers.saved
  );
  const isSaved = savedFreelancers.includes(Number(id));

  const handleToggleSave = () => {
    if (id) {
      dispatch(toggleSaveFreelancer(Number(id)));
    }
  };

  const handleHireSubmit = (formData: {
    freelancerName: string;
    freelancerId: number;
    name: string;
    email: string;
    message: string;
  }) => {
    console.log("Hiring Details:", formData);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchFreelancerById(id));
      dispatch(fetchFreelancerPosts(id));
      dispatch(fetchCommentCounts(id));
    }
  }, [dispatch, id]);

  const loadComments = (postId: string) => {
    if (!comments[postId]) {
      dispatch(fetchCommentsByPostId(postId));
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!details) return <p>Freelancer not found.</p>;

  return (
    <div className="portfolio">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <HireForm
          freelancerName={details.name}
          onSubmit={handleHireSubmit}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      </Modal>

      <Link to="/" className="back-link">
        <FaChevronLeft />
        Back
      </Link>

      <div className="portfolio-top">
        <div className="portfolio-header">
          <div className="portfolio-img">
            <img
              src={`https://robohash.org/${details.name}?size=160x160`}
              alt=""
            />
          </div>
          <div className="portfolio-title">
            <h2>{details.name}</h2>
            <button
              className={`portfolio-save-button ${isSaved ? "saved" : ""}`}
              onClick={handleToggleSave}
            >
              {isSaved ? <div className="save-button-text"><FaHeart />Saved</div> : <div className="save-button-text"><FaRegHeart />Save</div>}
            </button>
          </div>
        </div>

        {/* STYLES OF THIS DIV ARE IN APP.CSS (GENERIC STYLE) */}
        <div className="hire-section">
          <div className="hire-text">
            <h3>$ 24</h3>
            <p> / hr</p>
          </div>
          <button onClick={() => setIsModalOpen(true)}>Hire</button>
        </div>
      </div>

      <div className="portfolio-contact">
        <div className="contact-col">
          <ContactInfoRow icon={<FaEnvelope />} text={details.email} />
          <ContactInfoRow icon={<FaPhone />} text={details.phone} />
        </div>
        <div className="contact-col">
          <ContactInfoRow icon={<FaGlobe />} text={details.website} />
          <ContactInfoRow
            icon={<FaLocationDot />}
            text={`${details.address.street}, ${details.address.city}`}
          />
        </div>
      </div>

      <div className="portfolio-posts">
        <h2>{posts.length} Jobs</h2>
        <div className="portfolio-posts-grid">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id.toString()}
              title={post.title}
              body={post.body}
              comments={comments}
              commentCount={commentCounts[post.id]}
              commentLoading={commentLoading}
              loadComments={loadComments}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
