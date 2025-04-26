import { ethers } from "ethers";

// 🚀 Paste your new deployed contract address here after deploy
const CONTRACT_ADDRESS = "0x6CCe38a4B24eF5B69301609E9e4B33b46f3185F7"; 

const CONTRACT_ABI = [
  "function getGreeting() view returns (string memory)",
  "function setGreeting(string memory _greeting)"
];

export async function getGreeting() {
  if (!window.ethereum) return "No wallet detected";

  const provider = new ethers.BrowserProvider(window.ethereum); // ethers v6 uses BrowserProvider
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  return await contract.getGreeting();
}

export async function setGreeting(newGreeting) {
  if (!window.ethereum) return;

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  console.log("🖋️ Submitting tx via wallet...");
  const tx = await contract.setGreeting(newGreeting);
  console.log("⏳ Waiting for tx confirmation...");
  await tx.wait();
  console.log("✅ Greeting updated on-chain!");
}