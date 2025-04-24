import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x427EE58a6c574032085AEB90Dd05dEea6F054930";
const CONTRACT_ABI = [
  "function getGreeting() public view returns (string)",
  "function setGreeting(string memory _greeting) public"
];

// PRIVATE KEY: Get this from the same wallet you deployed with on Blocktopus
const PRIVATE_KEY = "0x7d693de64287762eb2f808ca8c1859e8e9e327524974a235fabc1b1862ee0b67"; // ⚠️ TESTNET ONLY

// RPC URL from your Blocktopus environment
const RPC_URL = "https://60df3bbba02e4cc48c0f41434128bddb-rpc.prod.bloctopus.io";

export async function getGreeting() {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  return await contract.getGreeting();
}

export async function setGreeting(newGreeting) {
  if (!window.ethereum) return;

  await window.ethereum.request({ method: 'eth_requestAccounts' });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  const tx = await contract.setGreeting(newGreeting);
  await tx.wait();
}