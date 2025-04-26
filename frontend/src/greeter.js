import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xbd63F3Eb3272195Cc97448fC2f686Cabb2b8D6ce"; // <-- your deployed address
const CONTRACT_ABI = [
  "function getGreeting() public view returns (string)",
  "function setGreeting(string memory _greeting) public"
];

export async function getGreeting() {
  if (!window.ethereum) return "No wallet detected";

  const provider = new ethers.providers.Web3Provider(window.ethereum); // ✅
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  return await contract.getGreeting();
}

export async function setGreeting(newGreeting) {
  if (!window.ethereum) return;
  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.providers.Web3Provider(window.ethereum); // ✅
  const signer = provider.getSigner(); // ✅ no `await`
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  console.log("Submitting tx via wallet...");
  const tx = await contract.setGreeting(newGreeting);
  await tx.wait();
}