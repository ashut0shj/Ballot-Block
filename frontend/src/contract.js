import { BrowserProvider, Contract } from "ethers";

const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = [
    "event MemberJoined(address indexed,uint256)",
    "event VoteCreated(address indexed,uint256 indexed,uint256,uint256)",
    "event Voted(address indexed,uint256 indexed,uint256 indexed,uint256)",
    "function createVote(string,uint256,uint256)",
    "function didVote(address,uint256) view returns (bool)",
    "function getVote(uint256) view returns (string,address,uint256[],uint256)",
    "function join()",
    "function members(address) view returns (bool)",
    "function vote(uint256,uint256)"
];

export const connect = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    throw new Error("MetaMask not found");
  }

  try {
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new Contract(address, abi, signer);
    
    return { contract, signer, provider };
  } catch (error) {
    console.error("Connection error:", error);
    throw error;
  }
};

export const getContract = async (provider) => {
  try {
    if (!provider) {
      if (!window.ethereum) {
        throw new Error("MetaMask not found");
      }
      provider = new BrowserProvider(window.ethereum);
    }
    
    const signer = await provider.getSigner();
    const contract = new Contract(address, abi, signer);
    
    return [contract, signer];
  } catch (error) {
    console.error("getContract error:", error);
    throw error;
  }
};