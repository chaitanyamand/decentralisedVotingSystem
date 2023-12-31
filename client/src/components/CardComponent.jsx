import React, { useEffect, useState } from "react";
import Card from "./Card";
import CardWinner from "./CardWinner";

const CardComponent = ({ contract, accounts, results, showResult }) => {
  const [candidateList, setCandidateList] = useState([]);

  const updateCandidateList = async () => {
    try {
      const updatedCandidateList = await contract.methods
        .getAllCandidateDetails()
        .call();
      setCandidateList(updatedCandidateList);
    } catch (error) {
      console.log("Error in getting candidate list:", error);
    }
  };

  useEffect(() => {
    updateCandidateList();
  }, []);

  contract.events.PartyAdded().on("data", () => {
    updateCandidateList();
    console.log("Party added");
  });
  contract.events.PartyRemoved().on("data", () => {
    updateCandidateList();
    console.log("Party removed");
  });
  contract.events.CandidateAdded().on("data", () => {
    updateCandidateList();
    console.log("Candidate added");
  });
  contract.events.CandidateRemoved().on("data", () => {
    updateCandidateList();
    console.log("Candidate removed");
  });

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {(showResult &&
        results &&
        results.map &&
        results.map((candidate, index) => {
          const { candidateId, partyId, name, partyName } = candidate;
          return (
            <CardWinner
              candidateId={candidateId}
              partyId={partyId}
              partyName={partyName}
              rank={index + 1}
              name={name}
              key={candidateId}
            />
          );
        })) ||
        (candidateList &&
          candidateList.map((candidate) => {
            const { candidateId, partyId, age, name, partyName } = candidate;
            return (
              <Card
                candidateId={candidateId}
                partyId={partyId}
                partyName={partyName}
                age={age}
                name={name}
                contract={contract}
                accounts={accounts}
                key={candidateId}
              />
            );
          }))}
    </div>
  );
};

export default CardComponent;
