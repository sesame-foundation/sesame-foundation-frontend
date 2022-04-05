import React from "react";
import Badge from "react-bootstrap/Badge";

export const SolvedBadge = ({ isUnsolved }) => {
  return (
    <>
      {
        isUnsolved ? (
          <Badge bg="secondary">Status: Unsolved</Badge>
        ) : (
          <Badge bg="success">Status: Solved</Badge>
        )
      }
    </>
  );
}
