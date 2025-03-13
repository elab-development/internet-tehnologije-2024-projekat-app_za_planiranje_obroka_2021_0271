import React from "react";
import { Card } from "react-bootstrap";
import { RiLeafFill } from "react-icons/ri";

function HomePageDescription({ title, content, icon }) {
  return (
    <Card
      className="mb-4 shadow-sm border-light"
      style={{
        borderRadius: "15px",
        border: "1px solid #66BB6A",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Card.Body
        className="d-flex align-items-center mb-3"
        style={{
          transition: "background-color 0.3s, color 0.3s",
        }}
      >
        <div
          className="icon"
          style={{
            fontSize: "24px",
            marginRight: "10px",
            color: "#66BB6A",
            transition: "color 0.3s",
          }}
        >
          {icon}
        </div>
        <h5
          className="card-title"
          style={{
            color: "#66BB6A",
            transition: "color 0.3s",
          }}
        >
          {title}
        </h5>
      </Card.Body>
      <Card.Body>
        <div
          className="card-text"
          style={{
            color: "#66BB6A",
            transition: "color 0.3s",
          }}
        >
          {content}
        </div>
      </Card.Body>

      <style>
        {`
          .card:hover {
            background-color: #66BB6A !important;
            color: white !important;
          }

          .card:hover .card-title,
          .card:hover .card-text {
            color: white !important;
          }

          .card:hover .icon {
            color: white !important;
          }
        `}
      </style>
    </Card>
  );
}

export default HomePageDescription;
