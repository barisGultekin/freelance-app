import React from "react";
import { Link } from "react-router-dom";

import "./FreelancerCard.css";

import { FaRegHeart, FaHeart } from "react-icons/fa6";

interface FreelancerCardProps {
  name: string;
  email: string;
  phone: string;
  city: string;
  photo: string;
  finishedJobCount: number;
  onHire: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

const FreelancerCard: React.FC<FreelancerCardProps> = ({
  id,
  name,
  email,
  phone,
  city,
  photo,
  finishedJobCount,
  onHire,
  isSaved,
  onToggleSave,
}) => {

  return (
    <Link to={`/portfolio/${id}`} className="freelancer-card">
      
      <div className="freelancer-header">
        <div className="freelancer-info">
          <div className="freelancer-img">
            <img src={photo} alt={`${name}`} />
          </div>

          <div className="freelancer-title">
            <h3 className="freelancer-name">{name}</h3>
            <div className="freelancer-contact">{email}</div>
            <div className="freelancer-contact">{phone}</div>
          </div>
        </div>
        <button
          className={`freelancer-save-button ${isSaved ? "saved" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            onToggleSave();
          }}
        >
          {isSaved ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      <div className="freelancer-tags">
        <div className="freelancer-tag">{city}</div>
        <div className="freelancer-tag">{finishedJobCount} Jobs</div>
      </div>
      <div className="hire-section full-width">
        <div className="hire-text">
          <h3>$ 24</h3>
          <p> / hr</p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation
            onHire();
          }}
        >
          Hire
        </button>
      </div>
    </Link>
  );
};

export default FreelancerCard;
