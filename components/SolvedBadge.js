import React from "react";
import Badge from "react-bootstrap/Badge";

export default function SolvedBadge({ isUnsolved }) {
  return (
    <>
      {isUnsolved ? (
        <Badge bg="secondary">Status: Unsolved</Badge>
      ) : (
        <Badge bg="success">Status: Solved</Badge>
      )}
    </>
  );
}
