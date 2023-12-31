// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract votingSystem{

    constructor(){
        owner=msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender==owner,"Only Owner is Allowed To Do This Activity!");
        _;
    }

    modifier onlyAfterDeclaration(){
        require(showResult,"Results are not declared yet,voting is still going on!");
        _;
    }

    struct Candidate{
        uint candidateId;
        uint age;
        uint partyId;
        string name;
        string partyName;
    }

    address owner;
    mapping(uint=>string) private idToPartyName;
    mapping(uint=>Candidate) private idToCandidateDetails;
    Candidate[] private candidateList;
    mapping(uint=>uint) private CandidateVotes;
    mapping(uint=>uint) private PartyVotes;
    mapping(address=>uint) private userVotesCount;
    uint partyCount=1;
    uint candidateCount=1;
    bool public showResult=false;

    event PartyAdded(uint indexed partyId, string partyName);
    event CandidateAdded(uint indexed candidateId, string partyName, string candidateName);
    event PartyRemoved(uint indexed partyId, string partyName);
    event CandidateRemoved(uint indexed candidateId, string candidateName);
    event ResultShown(address owner);

    function isOwner()public view returns(bool){
        return msg.sender == owner;
    }

    function addParty(string memory _partyName) public onlyOwner{
        idToPartyName[partyCount]=_partyName;
        emit PartyAdded(partyCount, _partyName);
        partyCount++;
    }

    function addCandidate(uint _age,string memory _name,uint _partyid)public onlyOwner{
        require((_age>18)&&(_age<70),"Candidate's age should be greater than 18 and lesser than 70!");
        require(bytes(idToPartyName[_partyid]).length!=0,"There is no such party with specified id!");
        require(bytes(_name).length!=0,"The name field cannot be empty");
        string memory _partyName = idToPartyName[_partyid];

        Candidate memory candidate=Candidate(candidateCount,_age,_partyid,_name,_partyName);
        idToCandidateDetails[candidateCount]=candidate;
        candidateList.push(candidate);
        emit CandidateAdded(candidateCount, _partyName, _name);
        candidateCount++;

    }

    function removeParty(uint _partyId)public onlyOwner{
        string memory _partyName = idToPartyName[_partyId];
        idToPartyName[_partyId]="";
        PartyVotes[_partyId]=0;

        while(candidateList.length>=1 && candidateList[0].partyId==_partyId)
        {
            if(candidateList.length==1)
            {
                candidateList.pop();
            }
            else
            {
                candidateList[0] = candidateList[candidateList.length - 1];
                candidateList.pop();
            }
        }

        for(uint i=1;i<candidateList.length;i++)
        {
            if(candidateList[i].partyId==_partyId)
            {
                uint idofCandidateToBeRemoved = candidateList[i].candidateId;
                if (i < candidateList.length - 1) 
                {
                candidateList[i] = candidateList[candidateList.length - 1];
                }
                idToCandidateDetails[idofCandidateToBeRemoved]=Candidate(0,0,0,"","");
                CandidateVotes[idofCandidateToBeRemoved]=0;
                candidateList.pop();
                i--;
            }
            
        }

        emit PartyRemoved(_partyId, _partyName);

    }

    function removeCandidate(uint _candidateId)public onlyOwner{
        uint candidateVotes=CandidateVotes[_candidateId];
        string memory _candidateName=idToCandidateDetails[_candidateId].name;
        PartyVotes[idToCandidateDetails[_candidateId].partyId]=PartyVotes[idToCandidateDetails[_candidateId].partyId]-candidateVotes;
        CandidateVotes[_candidateId]=0;
        idToCandidateDetails[_candidateId]=Candidate(0,0,0,"","");
        
        while(candidateList.length>=1 && candidateList[0].candidateId==_candidateId)
        {
            if(candidateList.length==1)
            {
                candidateList.pop();
            }
            else
            {
                candidateList[0] = candidateList[candidateList.length - 1];
                candidateList.pop();
            }
        }

        for(uint i=1;i<candidateList.length;i++)
        {
            if(candidateList[i].candidateId==_candidateId){
                if (i < candidateList.length - 1) {
                candidateList[i] = candidateList[candidateList.length - 1];
            }
            
            candidateList.pop();

            i--;
            }
        }
        emit CandidateRemoved(_candidateId, _candidateName);
        
    }

    function getAllCandidateDetails()public view returns(Candidate[] memory){
        return candidateList;
    }

    function showTopThree() public view onlyAfterDeclaration returns (Candidate[] memory) {

    Candidate[] memory topThreeCandidates = new Candidate[](3);
    for (uint i = 0; i < 3; i++) {
        topThreeCandidates[i] = Candidate(0, 0,0, "", "");
    }

    for (uint i = 1; i <= candidateCount; i++) {
        uint votes = CandidateVotes[i];

       
        for (uint j = 0; j < 3; j++) {
            if (votes > CandidateVotes[topThreeCandidates[j].candidateId]) {
                for (uint k = 2; k > j; k--) {
                    topThreeCandidates[k] = topThreeCandidates[k - 1];
                }
                topThreeCandidates[j] = idToCandidateDetails[i];
                break; 
            }
        }
    }

    return topThreeCandidates;
}


    function getCandidateVotes(uint _candidateId) public view onlyAfterDeclaration returns(uint){
        return CandidateVotes[_candidateId];
    }

    function getPartyVotes(uint _partyid) public view onlyAfterDeclaration returns(uint){
        return PartyVotes[_partyid];
    }

    function setResultShowable()public onlyOwner{
        showResult=true;
        emit ResultShown(msg.sender);
    }

    function castAVote(uint _candidateId)public{
        
        require(userVotesCount[msg.sender]==0,"You are only allowed to cast a votes once!");
        require(idToCandidateDetails[_candidateId].partyId!=0,"There exists no matching candidate");

        uint _partyId=idToCandidateDetails[_candidateId].partyId;
        userVotesCount[msg.sender]++;
        CandidateVotes[_candidateId]++;
        PartyVotes[_partyId]++;

    }






}