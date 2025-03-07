import React from "react";
import { Card } from "react-bootstrap";
import { RiQuestionAnswerFill } from "react-icons/ri";

function FAQCard({ question, answer }) {
  return (
    <>
      <Card
        className="mb-3 shadow-sm border-light faq-card"
        style={{
          borderRadius: "10px",
          border: "1px solid #66BB6A",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Card.Body>
          <div className="d-flex align-items-center">
            <RiQuestionAnswerFill
              className="icon"
              style={{
                fontSize: "24px",
                color: "#66BB6A",
                marginRight: "10px",
              }}
            />
            <h5 className="card-title" style={{ color: "#388E3C" }}>
              {question}
            </h5>
          </div>
          <p className="card-text mt-2" style={{ color: "#4CAF50" }}>
            {answer}
          </p>
        </Card.Body>
      </Card>

      {/* Inline style */}
      <style>
        {`
          .faq-card:hover {
            background-color: #66BB6A !important;
            color: white !important;
          }

          .faq-card:hover .card-title,
          .faq-card:hover .card-text {
            color: white !important;
          }

          .faq-card:hover .icon {
            color: white !important;
          }
        `}
      </style>
    </>
  );
}

export default FAQCard;
