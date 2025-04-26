import { BrowserProvider, Contract } from "ethers";

const CONTRACT_ADDRESS = "0xbd63F3Eb3272195Cc97448fC2f686Cabb2b8D6ce"; // <-- Make sure this is your latest deployed address
const CONTRACT_ABI = [
  "function getGreeting() view returns (string)",
  "function setGreeting(string _greeting)"
];

export async function getGreeting() {
  if (!window.ethereum) return "No wallet detected";

  const provider = new BrowserProvider(window.ethereum); // ✅ ethers v6 BrowserProvider
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider); // ✅ ethers v6 Contract
  return await contract.getGreeting();
}

export async function setGreeting(newGreeting) {
  if (!window.ethereum) return;

  const provider = new BrowserProvider(window.ethereum); // ✅
  const signer = await provider.getSigner(); // ✅ await is needed
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer); // ✅

  console.log("Submitting tx via wallet...");
  const tx = await contract.setGreeting(newGreeting); // ✅
  await tx.wait();
  console.log("Greeting updated on-chain!");
}