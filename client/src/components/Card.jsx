import React, { useRef } from "react";
import { toast } from "react-toastify";
const Card = ({
  candidateId,
  partyId,
  age,
  name,
  partyName,
  contract,
  accounts,
  key,
}) => {
  var isAlreadyVoted = false;
  if (localStorage.getItem("vote")) {
    const votes = JSON.parse(localStorage.getItem("vote"));
    const voter = votes.voter;
    const candId = votes.candidateId;
    isAlreadyVoted = voter === accounts[0] && candId === candidateId;
  }
  const buttonRef = useRef(null);
  const handleVote = async (event) => {
    let toastId = toast.loading("Registering Vote..Please Wait!");
    try {
      await contract.methods.castAVote(candidateId).send({ from: accounts[0] });
      toast.update(toastId, {
        render: "Voted Successfully",
        type: "success",
        isLoading: false,
        autoClose: 1500,
        hideProgressBar: true,
      });
      if (buttonRef.current) {
        buttonRef.current.textContent = "Voted Successfully";
      }
      localStorage.removeItem("vote");
      localStorage.setItem(
        "vote",
        JSON.stringify({
          voter: accounts[0],
          candidateId,
        })
      );
    } catch (error) {
      toast.update(toastId, {
        render: "Error Casting The Vote",
        type: "error",
        isLoading: false,
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };

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
      <button
        style={
          isAlreadyVoted
            ? { width: "65%", fontSize: "1.2rem", marginTop: "0%" }
            : { width: "65%", fontSize: "1.2rem", marginTop: "3%" }
        }
        onClick={handleVote}
        ref={buttonRef}
      >
        {isAlreadyVoted ? "Already voted successfully" : "Vote"}
      </button>
    </div>
  );
};

export default Card;
