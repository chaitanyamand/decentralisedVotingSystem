import React from "react";

const CardWinner = ({ candidateId, partyId, name, partyName, rank, key }) => {
  return (
    <div
      style={{
        height: "320px",
        width: "350px",
        border: "1px solid gray",
        borderRadius: "10%",
        margin: "3%",
        textAlign: "center",
      }}
    >
      <h4 style={{}}>Candidate Id : {candidateId}</h4>
      <h2 style={{ fontSize: "1.7rem" }}>{name}</h2>
      <h2>{partyName}</h2>
      <h3>Party Id : {partyId}</h3>
      <h3 style={{ fontSize: "2rem" }}>Rank : {rank}</h3>
    </div>
  );
};

export default CardWinner;
