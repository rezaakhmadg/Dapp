import { BrowserProvider, Contract } from "ethers";

const CONTRACT_ADDRESS = "0x6CCe38a4B24eF5B69301609E9e4B33b46f3185F7"; // <- put your deployed address here
const CONTRACT_ABI = [
  "function getGreeting() view returns (string)",
  "function setGreeting(string _greeting)"
];

export async function getGreeting() {
  if (!window.ethereum) return "No wallet detected";

  const provider = new BrowserProvider(window.ethereum); // ✅ No "new" keyword
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider); // ✅ No "ethers." prefix needed
  
  return await contract.getGreeting();
}

export async function setGreeting(newGreeting) {
  if (!window.ethereum) return;

  const provider = new BrowserProvider(window.ethereum); // ✅
  const signer = await provider.getSigner();
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer); // ✅

  console.log("🖋️ Submitting tx via wallet...");
  const tx = await contract.setGreeting(newGreeting);
  console.log("⏳ Waiting for confirmation...");
  await tx.wait();
  console.log("✅ Greeting updated on-chain!");
}