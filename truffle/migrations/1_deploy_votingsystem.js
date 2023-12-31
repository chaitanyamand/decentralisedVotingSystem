const votingSystem = artifacts.require("votingSystem");

module.exports = async function (deployer) {
  await deployer.deploy(votingSystem);
  let instance = await votingSystem.deployed()
  await instance.addParty('BJP');
  await instance.addParty('INC');
  await instance.addParty('Shivsena');
  await instance.addParty('NCP');
  await instance.addParty('MNS');
  await instance.addParty('AAP');
  await instance.addCandidate(53, 'Narendra Modi', 1);
  await instance.addCandidate(57, 'Rahul Gandhi', 2);
  await instance.addCandidate(62, 'Uddhav Thackeray', 3);
  await instance.addCandidate(47, 'Ajit Pawar', 4);
  await instance.addCandidate(25, 'Raj Thackeray', 5);
  await instance.addCandidate(25, 'Arvind Kejriwal', 6);



};
