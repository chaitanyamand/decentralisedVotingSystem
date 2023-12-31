import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const OwnerMain = ({ state }) => {
  const { contract, accounts } = state;
  //console.log(contract, accounts);
  const navigate = useNavigate();
  const [inpt, setInpt] = useState({
    candName: "",
    candAge: "",
    candPartyId: "",
    partName: "",
    removeCandId: "",
    removePartId: "",
  });

  const checkIfIsOwnerAndResultShown = async () => {
    try {
      const isOwner = await contract.methods
        .isOwner()
        .call({ from: accounts[0] });
      if (isOwner === false) {
        toast.error("You are not the owner!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error in checking owner :", error);
    }
    try {
      const isResultShown = await contract.methods.showResult().call();
      if (isResultShown === true) {
        toast.info("Result already declared!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error in checking result shown :", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInpt((prevInpt) => {
      return { ...prevInpt, [name]: value };
    });
  };

  const handleAddCandidate = async () => {
    let toastId = toast.loading("Please Wait..Adding A Candidate");
    try {
      await contract.methods
        .addCandidate(inpt.candAge, inpt.candName, inpt.candPartyId)
        .send({ from: accounts[0] });
      toast.update(toastId, {
        render: "Successfully Added A Candidate",
        type: "success",
        isLoading: false,
        autoClose: 1500,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Error Adding A Candidate",
        type: "error",
        isLoading: false,
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };

  const handleAddParty = async () => {
    let toastId = toast.loading("Please Wait..Adding A Party");
    try {
      await contract.methods
        .addParty(inpt.partName)
        .send({ from: accounts[0] });
      toast.update(toastId, {
        render: "Successfully Added A Party",
        type: "success",
        isLoading: false,
        autoClose: 1500,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Error Adding A Party",
        type: "error",
        isLoading: false,
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };

  const handleRemoveCandidate = async () => {
    let toastId = toast.loading("Please Wait..Removing A Candidate");
    try {
      await contract.methods
        .removeCandidate(inpt.removeCandId)
        .send({ from: accounts[0] });
      toast.update(toastId, {
        render: "Successfully Removed A Candidate",
        type: "success",
        isLoading: false,
        autoClose: 1500,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Error Removing A Candidate",
        type: "error",
        isLoading: false,
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };

  const handleRemoveParty = async () => {
    let toastId = toast.loading("Please Wait..Removing A Party");
    try {
      await contract.methods
        .removeParty(inpt.removePartId)
        .send({ from: accounts[0] });
      toast.update(toastId, {
        render: "Successfully Removed A Party",
        type: "success",
        isLoading: false,
        autoClose: 1500,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Error Removing A Party",
        type: "error",
        isLoading: false,
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };

  const handleDeclareResults = async () => {
    let toastId = toast.loading("Please Wait..Declaring Results");
    try {
      await contract.methods.setResultShowable().send({ from: accounts[0] });

      toast.update(toastId, {
        render: "Results Declared",
        type: "success",
        isLoading: false,
        autoClose: 1500,
        hideProgressBar: true,
      });
      navigate("/");
    } catch (error) {
      toast.update(toastId, {
        render: "Error Declaring Results",
        type: "error",
        isLoading: false,
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };

  useEffect(() => {
    checkIfIsOwnerAndResultShown();
  }, []);

  return (
    <div>
      <div
        style={{
          border: "1px solid gray",

          margin: "3%",
          textAlign: "center",
        }}
      >
        <h2>Add A Candidate</h2>
        <label>Name:</label>
        <input
          className="inputFields"
          type="text"
          name="candName"
          onChange={handleChange}
          value={inpt.candName}
        ></input>
        <label>Age:</label>
        <input
          className="inputFields"
          type="number"
          name="candAge"
          onChange={handleChange}
          value={inpt.candAge}
        ></input>
        <label>Party Id:</label>
        <input
          className="inputFields"
          type="text"
          name="candPartyId"
          onChange={handleChange}
          value={inpt.candPartyId}
        ></input>
        <button onClick={handleAddCandidate}>Add Candidate</button>
      </div>
      <div
        style={{
          border: "1px solid gray",

          margin: "3%",
          textAlign: "center",
        }}
      >
        <h2>Add A Party</h2>
        <label>Name:</label>
        <input
          className="inputFields"
          type="text"
          name="partName"
          onChange={handleChange}
          value={inpt.partName}
        ></input>
        <button onClick={handleAddParty}>Add Party</button>
      </div>
      <div
        style={{
          border: "1px solid gray",

          margin: "3%",
          textAlign: "center",
        }}
      >
        <h2>Remove A Candidate</h2>
        <label>Candidate Id:</label>
        <input
          className="inputFields"
          type="number"
          name="removeCandId"
          onChange={handleChange}
          value={inpt.removeCandId}
        ></input>
        <button onClick={handleRemoveCandidate}>Remove Candidate</button>
      </div>
      <div
        style={{
          border: "1px solid gray",

          margin: "3%",
          textAlign: "center",
        }}
      >
        <h2>Remove A Party</h2>
        <label>Party Id:</label>
        <input
          className="inputFields"
          type="number"
          name="removePartId"
          onChange={handleChange}
          value={inpt.removePartId}
        ></input>
        <button onClick={handleRemoveParty}>Remove Party</button>
      </div>
      <div style={{ textAlign: "center" }}>
        <button onClick={handleDeclareResults} style={{ fontSize: "large" }}>
          Declare Results
        </button>
      </div>
    </div>
  );
};
export default OwnerMain;
