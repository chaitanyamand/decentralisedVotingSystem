# Decentralized Voting System

A blockchain-based voting platform that enables secure and transparent voting. The project uses Truffle, Solidity, and React.js.

## Setup Instructions

### Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v14+)
- **npm** (v6+) or **yarn**
- **Truffle** (v5.4+)
- **Ganache** (for local blockchain development)
- **MetaMask** (browser extension for blockchain interactions)

### 1. Clone the Repository

```bash
git clone https://github.com/chaitanyamand/decentralisedVotingSystem.git
cd decentralisedVotingSystem/
```

### 2. Install Dependencies

```bash
npm install

cd client/
npm install
```

### 5. Add Private Files

```bash
cd truffle/
touch .etherscan
echo <your-etherscan-api-key> >> .etherscan
touch .infura
echo <your-infura-api-key> >> .infura
touch .secret
echo <your-wallet-key-words> >> .secret
```

### 4. Start Ganache (Local Blockchain)

```bash
ganache-cli
```

### 5. Compile and Deploy Smart Contracts

```bash
cd truffle/
truffle compile
truffle migrate
```

### 6. Start the React Frontend

```bash
cd client/
npm run start
```

### 7. Connect MetaMask

- Open MetaMask and connect it to your local blockchain (Ganache) network.
- Import a Ganache account into MetaMask using a private key provided by Ganache.
