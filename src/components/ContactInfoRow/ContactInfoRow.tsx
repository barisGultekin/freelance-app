import React from "react";
import "./ContactInfoRow.css";

interface ContactInfoRowProps {
  icon: React.ReactNode;
  text: string;
}

const ContactInfoRow: React.FC<ContactInfoRowProps> = ({ icon, text }) => {
  return (
    <div className="contact-row">
      <div className="contact-row-icon">{icon}</div>
      <div className="contact-row-text">{text}</div>
    </div>
  );
};

export default ContactInfoRow;
