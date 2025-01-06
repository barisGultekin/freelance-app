import React, { useState } from "react";
import "./HireForm.css";

interface HireFormProps {
  freelancerName: string;
  onSubmit: (formData: {
    freelancerName: string;
    freelancerId: number;
    name: string;
    email: string;
    message: string;
  }) => void;
  onClose: () => void;
}

const HireForm: React.FC<HireFormProps> = ({
  freelancerName,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    freelancerName: "",
    freelancerId: -1,
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setFormData({ freelancerName: "", freelancerId: -1, name: "", email: "", message: "" });
    setIsSubmitted(false);
    onClose();
  };

  if (isSubmitted) {
    return (
      <div className="hire-form">
        <h3>Success!</h3>
        <p>
          You have successfully sent your offer to{" "}
          <strong>{freelancerName}</strong>.
        </p>
        <button onClick={handleClose}>Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="hire-form">
      <h3>Hire {freelancerName}</h3>
      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Send Offer</button>
    </form>
  );
};

export default HireForm;
