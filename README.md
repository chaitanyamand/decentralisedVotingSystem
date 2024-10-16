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

````bash
git clone https://github.com/your-username/decentralized-voting-system.git
cd decentralized-voting-system

### 2. Install Dependencies
```bash
npm install

### 3. Start Ganache (Local Blockchain)
```bash
ganache-cli

### 4. Compile and Deploy Smart Contracts
```bash
truffle compile
truffle migrate

### 5. Start the React Frontend
```bash
npm run start

### 6. Connect MetaMask
- Open MetaMask and connect it to your local blockchain (Ganache) network.
- Import a Ganache account into MetaMask using a private key provided by Ganache.

````
