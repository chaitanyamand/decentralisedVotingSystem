import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";

function Main({ state }) {
  const { contract, accounts } = state;
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  //console.log(contract, accounts);

  const updateShowResult = async () => {
    let updatedShowResult;
    try {
      updatedShowResult = await contract.methods.showResult().call();
      setShowResult(updatedShowResult);
    } catch (error) {
      console.log("Error in getting result shown status:", error);
    }
    if (updatedShowResult === true) {
      try {
        const topThreeCandidates = await contract.methods.showTopThree().call();
        setResults(topThreeCandidates);
      } catch (error) {
        console.log("Error fetching the results:", error);
      }
    }
  };

  useEffect(() => {
    updateShowResult();
  }, []);

  contract.events.ResultShown().on("data", async () => {
    await updateShowResult();
  });

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "3rem" }}>
        {showResult === true ? "Results" : "Ethereum Based Voting System"}
      </h1>
      <CardComponent
        contract={contract}
        accounts={accounts}
        showResult={showResult ? showResult : null}
        results={results ? results : null}
      />
    </div>
  );
}

export default Main;
